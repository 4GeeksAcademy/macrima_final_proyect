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
            artist: [] 
        },
        actions: {
           
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            getMessage: async () => {
                try {
                    // fetching data from the backend
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    // don't forget to return something, that is how the async resolves
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            changeColor: (index, color) => {
                //get the store
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                //reset the global store
                setStore({ demo: demo });
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
