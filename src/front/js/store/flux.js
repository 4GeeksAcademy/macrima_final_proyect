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

			tags: [

			]
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
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + `/api/tags/${tagId}`)
					const data = await resp.json()
					// setStore({ tags: data.tags })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading tags from backend", error)
				}
			},

			getTags: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/tags")
					const data = await resp.json()
					setStore({ tags: data.tags })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading tags from backend", error)
				}
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
