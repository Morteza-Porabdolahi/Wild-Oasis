import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded!')
  }

  return data;
}

export async function createEditCabin(newCabin = {}, id) {
  const hasImagePath = typeof newCabin.image === 'string';
  
  const imageName = `${Math.random()}-${newCabin.image?.name}`.replaceAll('/', "");
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  let query = supabase.from('cabins');

  if (!id) {
    query = query.insert([
      { ...newCabin, image: imagePath }
    ])
  }

  if (id) {
    query = query.update({ ...newCabin, image: imagePath })
      .eq('id', id)
  }

  const { data, error } = await query
    .select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created!')
  }

  if(!hasImagePath) {
    // upload image
    const { storageError } = await supabase
      .storage
      .from('cabin-images')
      .upload(imageName, newCabin.image, {
        cacheControl: '3600',
        upsert: false
      });

    // delete the cabin if there was an error uploading the corresponding error
    if (storageError) {
      await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)

      console.error(storageError);
      throw new Error('Cabin image could not be uploaded and the cabin was not created')
    }
  }

  return data;
}

export async function deleteCabin(cabinId) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', cabinId)

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted!')
  }

  return data;
}
