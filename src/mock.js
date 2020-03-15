import React from 'react'

export const trace = {
  startTime: 0,
  durationMs: 10000,
  lifelines: [
    {
      name: 'app',
      icon: 'mobile'
    },
    {
      name: 'bff',
      icon: 'hexagon'
    },
    {
      name: 'transfers',
      icon: 'hexagon'
    },
    {
      name: 'transfer-out-requested',
      icon: 'topic'
    },
    {
      name: 'deposits',
      icon: 'hexagon'
    },
    {
      name: 'transfer-out-liquidation',
      icon: 'topic'
    },
    {
      name: 'new-transfer-out',
      icon: 'topic'
    },
    {
      name: 'transfers-gateway',
      icon: 'hexagon'
    },
    {
      name: 'send-bacen-message',
      icon: 'topic'
    },
    {
      name: 'bacen-client',
      icon: 'hexagon'
    }
  ],
  processes: [
    {
      id: '1',
      startTime: 100,
      durationMs: 7200,
      lifeline: 'app'
    },
    {
      id: '2',
      startTime: 100,
      durationMs: 7200,
      lifeline: 'bff'
    },
    {
      id: '3',
      startTime: 1500,
      durationMs: 4000,
      lifeline: 'transfers'
    },
    {
      id: '4',
      startTime: 3000,
      durationMs: 2000,
      lifeline: 'transfer-out-requested'
    },
    {
      id: '5',
      startTime: 3500,
      durationMs: 2000,
      lifeline: 'deposits'
    },
    {
      id: '6',
      startTime: 4000,
      durationMs: 4500,
      lifeline: 'transfer-out-liquidation'
    },
    {
      id: '7',
      startTime: 7200,
      durationMs: 4500,
      lifeline: 'transfers'
    },
    {
      id: '8',
      startTime: 9800,
      durationMs: 3200,
      lifeline: 'new-transfer-out'
    },
    {
      id: '9',
      startTime: 11000,
      durationMs: 3200,
      lifeline: 'transfers-gateway'
    },
    {
      id: '10',
      startTime: 12000,
      durationMs: 3200,
      lifeline: 'send-bacen-message'
    },
    {
      id: '11',
      startTime: 14000,
      durationMs: 3200,
      lifeline: 'bacen-client'
    }
  ],
  operations: [
    {
      id: '1',
      from: 'app',
      to: 'bff',
      startTime: 150,
      label: (
        <span>
          GRAPHQL
          <br />
          mutation/requestTransferOut
        </span>
      )
    },
    {
      id: '2',
      from: 'bff',
      to: 'transfers',
      startTime: 1500,
      label: (
        <span>
          PUT <br /> /api/nuconta/:id/transfer-out-requests
        </span>
      )
    },
    {
      id: '3',
      from: 'transfers',
      to: 'bff',
      startTime: 4000,
      label: 'response'
    },
    {
      id: '4',
      from: 'bff',
      to: 'app',
      startTime: 5500,
      label: 'response'
    },
    {
      id: '5',
      from: 'transfers',
      to: 'transfer-out-requested',
      startTime: 3000,
      label: 'produce'
    },
    {
      id: '6',
      from: 'transfer-out-requested',
      to: 'deposits',
      startTime: 3500,
      label: 'consume'
    },
    {
      id: '7',
      from: 'deposits',
      to: 'transfer-out-liquidation',
      startTime: 4000,
      label: 'produce'
    },
    {
      id: '8',
      from: 'transfer-out-liquidation',
      to: 'transfers',
      startTime: 7200,
      label: 'consume'
    },
    {
      id: '9',
      from: 'transfers',
      to: 'new-transfer-out',
      startTime: 10000,
      label: 'produce'
    },
    {
      id: '10',
      from: 'new-transfer-out',
      to: 'transfers-gateway',
      startTime: 11000,
      label: 'consume'
    },
    {
      id: '11',
      from: 'transfers-gateway',
      to: 'send-bacen-message',
      startTime: 12000,
      label: 'produce'
    },
    {
      id: '12',
      from: 'send-bacen-message',
      to: 'bacen-client',
      startTime: 13800,
      label: 'consume'
    }
  ]
}
