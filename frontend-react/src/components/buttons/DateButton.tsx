import React from 'react';

function DateButton(props: { label: string }) {
  return (
    <button className="selectable-btn" type="button">
      {props.label}
    </button>
  );
}

export default DateButton;
