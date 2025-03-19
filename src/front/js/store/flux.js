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
