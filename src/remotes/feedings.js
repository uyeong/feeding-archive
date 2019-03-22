import firebase from 'firebase/app';
import moment from 'moment';

function generateUID() {
  const now = String(Date.now());
  const array = new Uint32Array(1);
  const random = window.crypto.getRandomValues(array)[0];
  return now + random;
}

export default {
  listen(userId, date, callback) {
    const db = firebase.firestore();
    return db.collection(`users/${userId}/feedings`)
      .doc(date)
      .onSnapshot(function(doc) {
        const data = doc.data() || {};
        const feedings = Object.keys(data).map(key => ({
          id: key,
          date: data[key][0],
          kind: data[key][1],
          volume: data[key][2]
        }));
        feedings.sort((a, b) => a.date - b.date);
        callback(feedings);
      });
  },

  async create(userId, { date, kind, volume }) {
    const db = firebase.firestore();
    const base = moment(date).format('YYYY-MM-DD');
    await db.collection(`users/${userId}/feedings`).doc(base).set({
      [generateUID()]: [ date, kind, volume ]
    }, { merge: true });
  },

  async update(userId, feedingId, { date, kind, volume }) {
    const db = firebase.firestore();
    const base = moment(date).format('YYYY-MM-DD');
    await db.collection(`users/${userId}/feedings`).doc(base).set({
      [feedingId]: [ date, kind, volume ]
    }, { merge: true });
  },

  async remove(userId, feedingId, date) {
    const db = firebase.firestore();
    const base = moment(date).format('YYYY-MM-DD');
    await db.collection(`users/${userId}/feedings`).doc(base).set({
      [feedingId]: firebase.firestore.FieldValue.delete()
    }, { merge: true });
  }
}
