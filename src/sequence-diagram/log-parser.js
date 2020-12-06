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

const logToLifelineId = log => {
  return uuidv4({ random: unpack(sha256(log.source)).slice(0, 16) })
}

const outLog = (log) => {
  return [':out-request', ':out-message']
    .indexOf(log.log_type) !== -1
}

const inLog = (log) => {
  return [':in-request', ':in-message']
    .indexOf(log.log_type) !== -1
}

const removeLastPartFromCid = cid => {
  const parts = cid.split('.')
  return parts.slice(0, parts.length - 1).join('.')
}

const findOutLog = (inLog, logs) => {
  const { cid: inCid } = inLog
  const outCid = removeLastPartFromCid(inCid)
  return logs.filter(outLog).find(log => log.cid === outCid)
}

const parseNode = log => {
  return {
    id: logToNodeId(log),
    meta: log,
    time: new Date(log._time).getTime(),
    lifeline: log.source
  }
}

export const parseNodes = logs => {
  return _.uniqBy(logs.map((log) => parseNode(log)), 'id')
}

export const parseLifelines = logs => {
  return _.uniqBy(_.sortBy(logs.map((log) => ({
    id: logToLifelineId(log),
    time: new Date(log._time).getTime(),
    label: log.source
  })), 'time'), 'id')
}

export const parseArrows = logs => {
  return _.uniqBy(logs.filter(inLog).map((log) => {
    const outLog = findOutLog(log, logs)
    const from = outLog ? parseNode(outLog) : undefined
    const to = parseNode(log)
    return {
      id: `${from?.id}-${to.id}`,
      from: from,
      to: to
    }
  })).filter((arrow) => arrow.from !== undefined)
}
