import Promise from 'bluebird';

export default function () {
  Promise.config({ cancellation: true });
}