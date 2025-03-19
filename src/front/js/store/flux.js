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
            artist: [],
            fans: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
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
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + `/api/artistas`);
                    const data = await resp.json();             
                    setStore({ artist: data.artist || [] });
                } catch (error) {
                    console.log("Artistas no encontrado", error);
                }
            },
            
            getSinlgeArtist: async (artistaId) => {
                try {
                    // fetching data from the backend
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
        }
    };
};

export default getState;
