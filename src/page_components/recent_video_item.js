import React from 'react'

const RecentVideoItem = props => <iframe src={`https://www.youtube.com/embed/${props.id}`} title={props.id} allowFullScreen />

export default RecentVideoItem
