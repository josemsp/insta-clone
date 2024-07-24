import { addDoc, collection, doc, Firestore, setDoc, Timestamp } from "firebase/firestore";
import { db } from "./lib";

// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)
export async function seedDatabase(firestore: Firestore) {
  const users = [
    {
      userId: 'Q20oWDOb5ShvN03xIgr9L562G6X2',
      username: 'karl',
      fullName: 'Karl Hadwen',
      emailAddress: 'karlhadwen@gmail.com',
      following: ['Q20oWDOb5ShvN03xIgr9L562G6X3'],
      followers: ['Q20oWDOb5ShvN03xIgr9L562G6X3', 'Q20oWDOb5ShvN03xIgr9L562G6X4', 'Q20oWDOb5ShvN03xIgr9L562G6X5'],
      dateCreated: Timestamp.now()
    },
    {
      userId: 'Q20oWDOb5ShvN03xIgr9L562G6X3',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['Q20oWDOb5ShvN03xIgr9L562G6X2'],
      dateCreated: Timestamp.now()
    },
    {
      userId: 'Q20oWDOb5ShvN03xIgr9L562G6X4',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['Q20oWDOb5ShvN03xIgr9L562G6X2'],
      dateCreated: Timestamp.now()
    },
    {
      userId: 'Q20oWDOb5ShvN03xIgr9L562G6X5',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['Q20oWDOb5ShvN03xIgr9L562G6X2'],
      dateCreated: Timestamp.now()
    },
    {
      userId: 'qmHC0bCSGpZbX6oFb5hZrtKqb6x2',
      username: 'jose',
      fullName: 'Jose salazar',
      emailAddress: 'jose@email.com',
      following: [
        "Q20oWDOb5ShvN03xIgr9L562G6X2",
        "Q20oWDOb5ShvN03xIgr9L562G6X3"
      ],
      followers: ['Q20oWDOb5ShvN03xIgr9L562G6X2'],
      dateCreated: Timestamp.fromMillis(Date.parse('2024-07-20T12:21:43.010Z'))
    }
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    // collection(firebase, 'users').add(users[k]);
    // await addDoc(collection(firestore, 'users'), users[k])
    setDoc(doc(db, 'users', users[k].userId), users[k])
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    await addDoc(collection(firestore, 'photos'), {
      photoId: i,
      userId: 'Q20oWDOb5ShvN03xIgr9L562G6X4',
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: 'Saint George and the Dragon',
      likes: [],
      comments: [
        {
          displayName: 'dali',
          comment: 'Love this place, looks like my animal farm!',
          dateCreated: Timestamp.now()
        },
        {
          displayName: 'orwell',
          comment: 'Would you mind if I used this picture?',
          dateCreated: Timestamp.now()
        }
      ],
      userLatitude: '40.7128°',
      userLongitude: '74.0060°',
      dateCreated: Timestamp.now()
    });
  }
}