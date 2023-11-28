import supabase from "./supabase";

export async function signup({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email, password, options: {
      data: {
        fullName,
        avatar: ""
      }
    }
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) return null;

  const { data: { user }, error } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message);
  }

  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const updatedUser = {};

  if(password) {
    updatedUser.password = password;
  }
  if(fullName) {
    updatedUser.data = { fullName }
  }
  
  const { data, error } = await supabase.auth.updateUser(updatedUser)

  if (error) {
    throw new Error(error.message);
  }
  
  if(!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`
  const { error: storageError } = await supabase.storage.from('avatars').upload(fileName, avatar);

  if(storageError) {
    throw new Error(storageError.message);
  }

  const { data: updatedUserData, error: updateErr } = await supabase.auth.updateUser({
    data: {
      avatar: `https://swajmiamrdgpmmibnlco.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    }
  });
  
  if(updateErr) {
    throw new Error(updateErr.message);
  }

  return updatedUserData;
}
