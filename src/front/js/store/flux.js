const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],

			tags: [],
            artist: [],
            fans: [],
			followers: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			agregarTags: async (tagsName) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/tags/new",{
						method : 'POST',
						headers: {'content-Type': "application/json"},
						body: JSON.stringify(tagsName)
					})
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading Tags from backend", error)
				}
			},


			eliminarTag: async (tagId) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/tags/${tagId}`, {
						method: 'DELETE',
					});
			
					if (!resp.ok) {
						console.log("Error al eliminar el tag desde el backend");
						return false;
					}
			
					const data = await resp.json();
					const store = getStore();
					const updatedTags = store.tags.filter(tag => tag.id !== tagId);
					setStore({ tags: updatedTags });
			
					return true;
				} catch (error) {
					console.log("Error eliminando el tag:", error);
					return false;
				}
			},


			editarTag: async (tagId, tagInfo) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/tags/${tagId}`,{
						method : 'PUT',
						headers: {'content-Type': "application/json"},
						body: JSON.stringify(tagInfo)
					})
					const data = await resp.json()
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading update tag from backend", error)
				}
			},

			getTag: async (tagId) => {
				try{
					
					const resp = await fetch(process.env.BACKEND_URL + `/api/tags/${tagId}`)
					const data = await resp.json()

					return data;
				}catch(error){
					console.log("Error loading tags from backend", error)
				}
			},

			getTags: async () => {
				try{

					const resp = await fetch(process.env.BACKEND_URL + "/api/tags")
					const data = await resp.json()
					setStore({ tags: data.tags })
					
					return data;
				}catch(error){
					console.log("Error loading tags from backend", error)
				}
			},

			getMessage: async () => {
				try{
					
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })

					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getFans: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/fans");
					if (!response.ok) throw new Error("Error fetching fans");
			
					const data = await response.json();
					setStore({ fans: data.fans || [] }); 
			
				} catch (error) {
					console.error("Error fetching fans:", error);
				}
			},
			
			
				addFan: async (fanData) => {
					try {
						const response = await fetch(process.env.BACKEND_URL + "/api/fan", {
							method: "POST",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(fanData)
						});
						
						if (!response.ok) {
							throw new Error("Failed to create fan");
						}
						
						const data = await response.json();
						console.log("Fan created successfully", data);
						return data;
					} catch (error) {
						console.error("Error creating fan:", error);
						return null;
					}
				},
				updateFan: async (fanId, fanData) => {
					try {
						const response = await fetch(process.env.BACKEND_URL + `/api/fan/${fanId}`, {
							method: "PUT",
							headers: {
								"Content-Type": "application/json"
							},
							body: JSON.stringify(fanData)
						});
						
						if (!response.ok) {
							throw new Error("Failed to update fan");
						}
						
						const data = await response.json();
						console.log("Fan updated successfully", data);
						return data;
					} catch (error) {
						console.error("Error updating fan:", error);
						return null;
					}
				},
				getFanById: async (fanId) => {
					try {
						const response = await fetch(process.env.BACKEND_URL + `/api/fan/${fanId}`)
						
						if (!response.ok) {
							throw new Error("Failed to fetch fan data");
						}
						const data = await response.json();
						return data;
					} catch (error) {
						console.error("Error fetching fan data:", error);
						return null;
					}
				},
				deleteFan: async (fan_id) => {
					try {
						const response = await fetch(process.env.BACKEND_URL + `/api/fan/${fan_id}`, {
							method: "DELETE"
						});
						if (!response.ok) throw new Error("Error deleting fan");
	
						
						const updatedFans = getStore().fans.filter(fan => fan.id !== fan_id);
						setStore({ fans: updatedFans });
	
					} catch (error) {
						console.error("Error deleting fan:", error);
					}
				},
			
			addArtist: async (infoArtista) => {
				try {
					console.log("Datos enviados:", infoArtista); 
					const resp = await fetch(`${process.env.BACKEND_URL}/api/artistas/add`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(infoArtista)
					});
					if (!resp.ok) {
						throw new Error(`Failed to create artist: ${resp.statusText}`);
					}
					const data = await resp.json();
					console.log("Artista creado exitosamente:", data);
					return data;
				} catch (error) {
					console.error("Error creando artista:", error);
					return null;
				}
			},	            
            getArtist: async () => {
                try {

                    const resp = await fetch(process.env.BACKEND_URL + `/api/artistas`);
                    const data = await resp.json();             
                    setStore({ artist: data.artist || [] });
                } catch (error) {
                    console.log("Artistas no encontrado", error);
                }
            },
            
            getSingleArtist: async (artistaId) => {
                try {

                    const resp = await fetch(process.env.BACKEND_URL + `/api/artista/${artistaId}`);
                    const data = await resp.json();             
                    return data;
                } catch (error) {
                    console.log("Artista no encontrado", error);
                }
            },
            updateArtist: async (artistaId, infoArtista) => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + `/api/artistas/${artistaId}`,{
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(infoArtista)
					});;
                    const data = await resp.json();             
                    return data;
                } catch (error) {
                    console.log("Artista no modificado", error);
                }
            },
			getFollowers: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/followers");
					if (!response.ok) throw new Error("Error fetching followers");
			
					const data = await response.json();
					setStore({ followers: data.followers || [] }); 
			
				} catch (error) {
					console.error("Error fetching followers:", error);
				}
			},
			getFollowerById: async (followerId) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/follower/${followerId}`)
					
					if (!response.ok) {
						throw new Error("Failed to fetch follower data");
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error fetching follower data:", error);
					return null;
				}
			},
			deleteFollower: async (fan_id, artista_id) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/followers/fan/${fan_id}/artist/${artista_id}`, {
						method: "DELETE"
					});
					if (!response.ok) throw new Error("Error deleting follower");

					const updatedFollowers = getStore().followers.filter(follower =>
						!(follower.fan.id === fan_id && follower.artista.id === artista_id)
					);
					setStore({ followers: updatedFollowers });

					return true;

				} catch (error) {
					console.error("Error deleting follower:", error);
				}
				return false;
			},
			
			followArtist: async (infoFollow) => {
				try {
					console.log("Datos enviados:", infoFollow); 
					const resp = await fetch(`${process.env.BACKEND_URL}/api/follower/new`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(infoFollow)
					});
					if (!resp.ok) {
						throw new Error(`Failed to create artist: ${resp.statusText}`);
					}
					const data = await resp.json();
					console.log("Seguidor creado exitosamente:", data);
					return data;
				} catch (error) {
					console.error("Error creando seguidor:", error);
					return null;
				}
			},
			
        }
    };
};

export default getState;
