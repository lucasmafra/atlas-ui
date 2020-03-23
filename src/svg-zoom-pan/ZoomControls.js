import React from 'react'
import { Button } from 'antd'
import { PlusOutlined, MinusOutlined, ExpandAltOutlined } from '@ant-design/icons'

const ZoomControls = ({ onZoomIn, onZoomOut, onFitToScreen }) => {
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Button size='large' icon={<PlusOutlined />} aria-label='Zoom in' onClick={onZoomIn} />
      </div>
      <div style={{ marginLeft: 4 }}>
        <Button size='large' icon={<MinusOutlined />} aria-label='Zoom out' onClick={onZoomOut} />
      </div>
      <div style={{ marginLeft: 4 }}>
        <Button
          size='large'
          icon={<ExpandAltOutlined />}
          aria-label='Fit to screen'
          onClick={onFitToScreen}
        />
      </div>
    </div>
  )
}

export default ZoomControls
