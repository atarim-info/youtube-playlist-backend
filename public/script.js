window.onload = function() {
  fetch('/videotrack', {
    method: 'GET'
  })
  .then((res) => res.json())
  .then((body) => {
    const videotrackBody = document.getElementById('videotrack-body');
    body.forEach((videotrack, index) => {
      // add to videotrack table
      const row = document.createElement('tr');
      row.id = `videotrack-${index}`;
      row.innerHTML = `
        <td scope="row" class="text-left">${videotrack.videoId}</td>
        <td>
          <button
            class="btn btn-outline-success btn-sm"
            id=${videotrack._id}
            cy-data=${'videotrack-' + index}
            onClick="doneTODO(event)"
          >
            Done
          </button>
        </td>`

      videotrackBody.appendChild(row);
    })
  })
}

function createVideoTrack() {
  const trackId = document.querySelector('input').value;
  fetch('/videotrack', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ videoId: trackId })
  })
  .then(() => window.location.reload());
}

function doneTODO(event) {
  const { id } = event.target;
  fetch(`/videotrack/${id}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ done: true })
  })
  .then(() => window.location.reload());
}
