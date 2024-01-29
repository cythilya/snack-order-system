import React from 'react';
function Message(props) {
    const { status } = props;

    const messages = {
      loading: 'Loading...',
      error: (
        <>
          Menu failed to load.
          <br />
          Please try again...
        </>
      ),
    };

    const messageText = messages[status];

    if (!messageText) {
      return null;
    }

    return (
      <div
        className={`message-${status}`}
        role={status === 'error' ? 'alert' : 'status'}
        aria-live="polite"
        aria-busy={status === 'loading'}
      >
        {messageText}
      </div>
    );
  }

export default Message;