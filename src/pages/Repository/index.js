import React from 'react';

export default function repository(props) {
  return <h1>Repository: {decodeURIComponent(props.match.params.repository)}</h1>
}
