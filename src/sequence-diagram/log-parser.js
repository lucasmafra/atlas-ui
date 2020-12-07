import { v4 as uuidv4 } from 'uuid';
import * as _ from 'lodash'
const { sha256 } = require('js-sha256');

const unpack = (str) => {
    const bytes = [];
    for(let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        bytes.push(char >>> 8);
        bytes.push(char & 0xFF);
    }
    return bytes;
}

const logToNodeId = log => {
  return uuidv4({ random: unpack(sha256(JSON.stringify(log))).slice(0, 16) })
}

const safeLogToNodeId = log => {
  if (!log) return
  return logToNodeId(log)
}

const logToServiceLifelineId = log => {
  return uuidv4({ random: unpack(sha256(log.source)).slice(0, 16) })
}

const logToTopicLifelineId = log => {
  return uuidv4({ random: unpack(sha256(log.topic)).slice(0, 16) })
}

const outLog = (log) => {
  return ['out-request', 'out-message']
    .indexOf(log.log) !== -1
}

const inLog = (log) => {
  return ['in-request', 'in-message']
    .indexOf(log.log) !== -1
}

const removeLastPartFromCid = cid => {
  const parts = cid.split('.')
  return parts.slice(0, parts.length - 1).join('.')
}

const findOutLog = (inLog, logs) => {
  const { cid: inCid } = inLog
  const outCid = removeLastPartFromCid(inCid)
  return logs.find(log => {
    return log.cid === outCid && ['out-request', 'out-message'].indexOf(log.log) !== -1
  })
}

const findParentLog = (log, logType, logs) => {
  const { cid } = log
  const parentCid = removeLastPartFromCid(cid)
  return logs.find(l => {
    return l.cid === parentCid && logType === l.log
  })
}

const parseLogLevel = log => {
  const text = log._raw
  if (text.match(/error|exception/)) {
    return 'ERROR'
  }
  return log.log_level
}

const parseServiceNode = log => {
  return {
    id: `service-${logToNodeId(log)}`,
    meta: {
      ...log,
      log_level: parseLogLevel(log)
    },
    time: new Date(log._time).getTime(),
    lifeline: log.source
  }
}

const parseTopicNode = log => {
  return {
    id: `topic-${logToNodeId(log)}`,
    meta: log,
    time: new Date(log._time).getTime(),
    lifeline: log.topic
  }
}

export const parseNodes = logs => {
  const serviceNodes = _.uniqBy(logs.map(parseServiceNode), 'id')
  const topicNodes = _.uniqBy(logs.filter((log) => {
    return log.log === 'out-message'
  }).map(parseTopicNode), 'id')
  return [...serviceNodes, ...topicNodes]
}

export const parseLifelines = logs => {
  const serviceLifelines =  _.uniqBy(_.sortBy(logs.map((log) => ({
    id: logToServiceLifelineId(log),
    time: new Date(log._time).getTime(),
    label: log.source,
    kind: 'service'
  })), 'time'), 'id')
  const topicLifelines =  _.uniqBy(_.sortBy(logs.filter((log) => log.log === 'out-message').map((log) => ({
    id: logToTopicLifelineId(log),
    time: new Date(log._time).getTime(),
    label: log.topic,
    kind: 'topic'
  })), 'time'), 'id')
  return _.sortBy([...serviceLifelines, ...topicLifelines], 'time')
}

export const parseArrows = logs => {
  const inMessages = logs.filter((log) => log.log === 'in-message')
  const outMessages = logs.filter((log) => log.log === 'out-message')
  const inRequests = logs.filter((log) => log.log === 'in-request')
  const inResponses = logs.filter((log) => log.log === 'in-response')

  const outMessageArrows = outMessages.map((log) => {
    const from = parseServiceNode(log)
    const to = parseTopicNode(log)
    return {
      id: `${from?.id}-${to?.id}`,
      from: from,
      to: to,
      kind: 'async'
    }
  })

  const inMessageArrows = inMessages.map((log) => {
    const out = findOutLog(log, logs)
    if (!out) return
    const from = parseTopicNode(out)
    const to = parseServiceNode(log)
    return {
      id: `${from?.id}-${to?.id}`,
      from: from,
      to: to,
      kind: 'async'
    }
  }).filter((arrow) => arrow !== undefined)



  const requestArrows = inRequests.map((log) => {
    const out = findOutLog(log, logs)
    if (!out) return
    const from = parseServiceNode(out)
    const to = parseServiceNode(log)
    return {
      id: `${from?.id}-${to.id}`,
      from: from,
      to: to,
      kind: 'sync'
    }
  }).filter(arrow => arrow !== undefined)

  const responseArrows = inResponses.map((log) => {
    const outResponse = findParentLog(log, 'out-response', logs)
    if (!outResponse) return
    const from = parseServiceNode(log)
    const to = parseServiceNode(outResponse)
    return {
      id: `${from?.id}-${to.id}`,
      from: from,
      to: to,
      kind: 'sync'
    }
  }).filter(arrow => arrow !== undefined)


  // return [...outMessageArrows, ...inMessageArrows]
  return [...outMessageArrows, ...inMessageArrows, ...requestArrows, ...responseArrows]
}
