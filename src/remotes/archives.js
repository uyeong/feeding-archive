import firebase from 'firebase/app';

export default {
  async fetchAll(userId, date) {
    const db = firebase.firestore();
    const result = await db.collection("archives").doc(userId + '.' + date).get();
    const data = result.data() || {};
    const list = Object.keys(data).map(key => ({
      date: parseInt(key, 10),
      kind: data[key][0],
      volume: data[key][1]
    }));
    list.sort((a, b) => a.date < b.date ? 1 : -1);
    return list;
  }
}
