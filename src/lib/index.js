/* eslint-disable no-alert */
/* eslint-disable import/named */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import {
  auth,
  provider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  collection,
  db,
  addDoc,
  updateProfile,
  getDocs,
  getDoc,
  where,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from '../firebase/initializeFirebase.js';
import logo from '../components/images/logo.png';
import deleteIcon from '../components/images/delete.png';
import editIcon from '../components/images/edit.png';

export const createAccount = (email, password, username) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      updateProfile(userCredential.user, {
        displayName: username,
      });
      sendEmailVerification(userCredential.user);
      return user;
    });
};

export const logInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      return user;
    });
};

export const signOutSession = () => signOut(auth);

export const resetPassword = (email) => sendPasswordResetEmail(auth, email);

export const logInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(token, user);
      return { user, token };
    });
};

// crear carpeta con post
export async function createPost(username, titulo, body, timestamp) {
  try {
    const data = {
      author: username,
      title: titulo,
      content: body,
      date: timestamp,
      likes: 0,
      likesArray: [],
    };
    const docPost = await addDoc(collection(db, 'Post'), data);
    console.log('Document written with ID: ', docPost.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

// Eliminar Post
export const deletePost = (postId) => deleteDoc(doc(db, 'Post', postId));

// Editar Post
export async function updatePost(postId, newData) {
  try {
    const postRef = doc(db, 'Post', postId);
    await updateDoc(postRef, newData);
    console.log('Post updated successfully');
  } catch (e) {
    console.error('Error updating post: ', e);
  }
}
// Mostrar post solo de un usuario
export async function displayUserPosts(user) {
  try {
    if (user) {
      const querySnapshot = await getDocs(query(collection(db, 'Post'), where('author', '==', user.displayName), orderBy('date', 'desc')));
      const postsSection = document.querySelector('.post-by-user');

      querySnapshot.forEach((file) => {
        const data = file.data();
        const postId = file.id;

        const postDiv = document.createElement('div');
        postDiv.className = 'post';
        postDiv.setAttribute('data-post-id', postId);

        // Nombre del autor mas foto
        const divUserInfo = document.createElement('div');
        divUserInfo.className = 'div-user-info';

        const photo = document.createElement('img');
        photo.className = 'user-post-photo';
        photo.src = logo;

        const author = document.createElement('h3');
        author.textContent = `${data.author}`;
        author.className = 'author';

        const title = document.createElement('h3');
        title.textContent = data.title;
        title.className = 'title-post';

        const content = document.createElement('p');
        content.textContent = data.content;
        content.className = 'content';

        const divEndPost = document.createElement('div');
        divEndPost.className = 'div-bottom-post';

        const divReaction = document.createElement('div');
        divReaction.className = 'div-reaction';

        const reaction = document.createElement('button');
        reaction.className = 'reaction-button';
        reaction.textContent = `${data.likes} 💀`;
        reaction.addEventListener('click', async () => {
          const postRef = doc(db, 'Post', postId);
          const postSnapshot = await getDoc(postRef);
          const postData = postSnapshot.data();

          const userId = user.uid;
          const likesArr = postData.likesArray || [];
          const userLikesPost = likesArr.includes(userId);

          try {
            if (userLikesPost) {
              const getIndexOfUser = likesArr.indexOf(userId);
              likesArr.splice(getIndexOfUser, 1);
            } else {
              likesArr.push(userId);
            }

            const newLikesCount = likesArr.length;

            await updateDoc(postRef, {
              likes: newLikesCount,
              likesArray: likesArr,
            });
            reaction.textContent = `${newLikesCount} 💀`;
          } catch (error) {
            console.error('Error updating likes:', error);
          }
        });
        // Borrar post
        const divDeleEdit = document.createElement('div');
        divDeleEdit.className = 'div-delete-edit';

        const modal = document.querySelector('.modal');

        const deletePostImg = document.createElement('img');
        deletePostImg.src = deleteIcon;
        deletePostImg.className = 'img-endPost';
        deletePostImg.addEventListener('click', () => {
          modal.style.display = 'block';

          const buttonDelete = document.querySelector('.modal-btn-ok');
          buttonDelete.addEventListener('click', () => {
            deletePost(postId);
            postDiv.remove();
            modal.style.display = 'none';
          });

          const buttonCancel = document.querySelector('.modal-btn-cancel');
          buttonCancel.addEventListener('click', () => {
            modal.style.display = 'none';
          });
        });

        const editPostImg = document.createElement('img');
        editPostImg.src = editIcon;
        editPostImg.className = 'img-endPost';
        editPostImg.addEventListener('click', () => {
          const editBox = document.querySelector('.edit-box');
          editBox.style.display = 'block';

          const editTitle = document.querySelector('.edit-title');
          const editText = document.querySelector('.edit-text');

          editTitle.value = data.title;
          editText.value = data.content;

          const editForm = document.querySelector('.edit-form');
          editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newTitle = editTitle.value;
            const newText = editText.value;

            const newData = {
              title: newTitle,
              content: newText,
            };

            await updatePost(postId, newData);

            editBox.style.display = 'none';
            postsSection.innerHTML = '';
            await displayUserPosts(user);

            const cancelEdit = document.querySelector('.cancel-edit');
            cancelEdit.addEventListener('click', () => {
              editBox.style.display = 'none';
            });
          });
        });

        divUserInfo.append(author, photo);
        divReaction.append(reaction);
        divDeleEdit.append(deletePostImg, editPostImg);
        divEndPost.append(divReaction, divDeleEdit);
        postDiv.append(divUserInfo, title, content, divEndPost);
        postsSection.appendChild(postDiv);
      });
    }
  } catch (e) {
    console.error('Error al actualizar: ', e);
  }
}

export async function displayAllPosts() {
  try {
    const querySnapshot = await getDocs(query(collection(db, 'Post'), orderBy('date', 'desc')));
    const postsSection = document.querySelector('.post-all-users');

    querySnapshot.forEach((file) => {
      const data = file.data();
      const postId = file.id;
      const user = auth.currentUser;

      const postDiv = document.createElement('div');
      postDiv.className = 'post';

      const divUserInfo = document.createElement('div');
      divUserInfo.className = 'div-user-info';

      const photo = document.createElement('img');
      photo.className = 'user-post-photo';
      photo.src = logo;

      const author = document.createElement('h3');
      author.textContent = `${data.author}`;
      author.className = 'author';

      const title = document.createElement('h3');
      title.textContent = data.title;
      title.className = 'title-post';

      const content = document.createElement('p');
      content.textContent = data.content;
      content.className = 'content';

      const divEndPost = document.createElement('div');
      divEndPost.className = 'div-bottom-post';

      const divReaction = document.createElement('div');
      divReaction.className = 'div-reaction';

      const reaction = document.createElement('button');
      reaction.className = 'reaction-button';
      reaction.textContent = `${data.likes} 💀`;

      reaction.addEventListener('click', async () => {
        const postRef = doc(db, 'Post', postId);
        const postSnapshot = await getDoc(postRef);
        const postData = postSnapshot.data();

        const userId = user.uid;
        const likesArr = postData.likesArray || [];
        const userLikesPost = likesArr.includes(userId);

        try {
          if (userLikesPost) {
            const getIndexOfUser = likesArr.indexOf(userId);
            likesArr.splice(getIndexOfUser, 1);
          } else {
            likesArr.push(userId);
          }

          const newLikesCount = likesArr.length;

          await updateDoc(postRef, {
            likes: newLikesCount,
            likesArray: likesArr,
          });
          reaction.textContent = `${newLikesCount} 💀`;
        } catch (error) {
          console.error('Error al actualizar:', error);
        }
      });

      divUserInfo.append(author, photo);
      divReaction.append(reaction);
      divEndPost.append(divReaction);
      postDiv.append(divUserInfo, title, content, divEndPost);
      postsSection.appendChild(postDiv);
    });
  } catch (e) {
    console.error('Error al actualizar: ', e);
  }
}
