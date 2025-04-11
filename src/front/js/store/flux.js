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
			followers: [],
			wallPapers:[],
			TagsWallpapers:[],
			favoritos:[],
			me_gusta:[],
            coments: [],
            fanFeedData: [],
            authFan: false,
            access_token: null,
            artistaDashboardData:[],
            artistaFeed:[],
            authArtistaFeed:false,
            authArtista : false,
            artistaData:[],
			access_token: null,
			fanDashboardData: [],
			authFan: false,
			fanData: [],
            fanComents: [],
            feedData: [],
            authFanFeed: false,
            wallpapersLocated: [],
            artistasLocated: [],
            
		},

        actions: {
        
            exampleFunction: () => {
                getActions().changeColor(0, "green");
            },

            // TAGS CRUD
            agregarTags: async (tagsName) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tags/new`, {
                        method: 'POST',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify(tagsName)
                    });
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.error("Error loading Tags from backend", error);
                    return null;
                }
            },

            eliminarTag: async (tagId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tags/${tagId}`, {
                        method: 'DELETE',
                    });

                    if (!resp.ok) throw new Error("Error al eliminar el tag desde el backend");

                    const store = getStore();
                    const updatedTags = store.tags.filter(tag => tag.id !== tagId);
                    setStore({ tags: updatedTags });

                    return true;
                } catch (error) {
                    console.error("Error eliminando el tag:", error);
                    return false;
                }
            },

            editarTag: async (tagId, tagInfo) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tags/${tagId}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': "application/json" },
                        body: JSON.stringify(tagInfo)
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error updating tag:", error);
                    return null;
                }
            },

            getTag: async (tagId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tags/${tagId}`);
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error loading tag:", error);
                    return null;
                }
            },

            getTags: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tags`);
                    const data = await resp.json();
                    setStore({ tags: data.tags });
                    return data;
                } catch (error) {
                    console.error("Error loading tags:", error);
                    return null;
                }
            },

            // MESSAGE
            getMessage: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/hello`);
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.error("Error loading message:", error);
                    return null;
                }
            },

            // FANS CRUD
            getFans: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/fans`);
                    const data = await resp.json();
                    setStore({ fans: data.fans || [] });
                } catch (error) {
                    console.error("Error fetching fans:", error);
                }
            },

            addFan: async (fanData) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/fan`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(fanData)
                    });
                    if (!resp.ok) throw new Error("Failed to create fan");
                    const data = await resp.json();
                    console.log("Fan created successfully", data);
                    return data;
                } catch (error) {
                    console.error("Error creating fan:", error);
                    return null;
                }
            },

            updateFan: async (fanId, fanData) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/fan/${fanId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(fanData)
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error updating fan:", error);
                    return null;
                }
            },

            getFanById: async (fanId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/fan/${fanId}`);
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching fan by ID:", error);
                    return null;
                }
            },

            deleteFan: async (fanId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/fan/${fanId}`, {
                        method: "DELETE"
                    });
                    if (!resp.ok) throw new Error("Failed to delete fan");
                    const updatedFans = getStore().fans.filter(fan => fan.id !== fanId);
                    setStore({ fans: updatedFans });
                } catch (error) {
                    console.error("Error deleting fan:", error);
                }
            },

            // ARTISTS CRUD
            addArtist: async (infoArtista) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/artistas/add`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(infoArtista)
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error creating artist:", error);
                    return null;
                }
            },

            getArtist: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/artistas`);
                    const data = await resp.json();
                    setStore({ artist: data.artist || [] });
                } catch (error) {
                    console.error("Error fetching artists:", error);
                }
            },

            getSingleArtist: async (artistaId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/artista/${artistaId}`);
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching single artist:", error);
                    return null;
                }
            },
            getSingleArtistProtected: async () => {
                try {
                    const requestOptions = {
                        method: 'GET',
                      headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('artistaFeedToken')}`, 
                        }                       
                    };
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/artista-protected`, requestOptions);
                    const data = await resp.json();
                    setStore({ authArtista: true });
                    return data;
                } catch (error) {
                    console.error("Error fetching single artist:", error);
                    return null;
                }
            },
            editarArtistaFeed: async (artistData) => {
                try {
                    const requestOptions = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('artistaFeedToken')}`, 
                        },
                        body: JSON.stringify(artistData), 
                    };
            
                    const response = await fetch(`${process.env.BACKEND_URL}/api/artista-edit`, requestOptions);
            
                    if (!response.ok) {
                        throw new Error('Error al actualizar los datos del artista');
                    }
            
                    const data = await response.json();
                    return data; 
                } catch (error) {
                    console.error("Error en editarArtistaFeed:", error);
                    return null;
                }
            },
            
           
            updateArtist: async (artistaId, infoArtista) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/artistas/${artistaId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(infoArtista)
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error updating artist:", error);
                    return null;
                }
            },
            

            // FOLLOWERS CRUD
            getFollowers: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/followers`);
                    const data = await resp.json();
                    setStore({ followers: data.followers || [] });
                } catch (error) {
                    console.error("Error fetching followers:", error);
                }
            },

            getFollowerById: async (followerId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/follower/${followerId}`);
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching follower by ID:", error);
                    return null;
                }
            },

            deleteFollower: async (fanId, artistaId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/followers/fan/${fanId}/artist/${artistaId}`, {
                        method: "DELETE"
                    });
                    if (!resp.ok) throw new Error("Failed to delete follower");
                    const updatedFollowers = getStore().followers.filter(
                        follower => !(follower.fan.id === fanId && follower.artista.id === artistaId)
                    );
                    setStore({ followers: updatedFollowers });
                    return true;
                } catch (error) {
                    console.error("Error deleting follower:", error);
                    return false;
                }
            },

            followArtist: async (infoFollow) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/follower/new`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(infoFollow)
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error creating follower:", error);
                    return null;
                }
            },

            // WALLPAPERS CRUD
            getWallpapers: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/wallpapers`);
                    const data = await resp.json();
                    setStore({ wallPapers: data || [] });
                } catch (error) {
                    console.error("Error fetching wallpapers:", error);
                }
            },

            newWallpaper: async (wallpaperData) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/wallpaper/new`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(wallpaperData)
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error creating wallpaper:", error);
                    return null;
                }
            },

            updateWallpaper: async (wallpaperId, wallpaperData) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/wallpaper/edit/${wallpaperId}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(wallpaperData)
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error updating wallpaper:", error);
                    return null;
                }
            },

            getWallpaperById: async (paperId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/wallpaper/${paperId}`);
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching wallpaper by ID:", error);
                    return null;
                }
            },

            deleteWallpaper: async (wallpaperId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/wallpaper/${wallpaperId}`, {
                        method: "DELETE"
                    });
                    if (!resp.ok) throw new Error("Failed to delete wallpaper");
                    const updatedWallpapers = getStore().wallPapers.filter(w => w.id !== wallpaperId);
                    setStore({ wallPapers: updatedWallpapers });
                } catch (error) {
                    console.error("Error deleting wallpaper:", error);
                }
            },

           
            newTagWallpaper: async (TagsWallpaper) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/wallpapertag`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(TagsWallpaper)
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error adding tag to wallpaper:", error);
                    return null;
                }
            },

            getTagsWallpapers: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tags_wallpaper`);
                    const data = await resp.json();
                    setStore({ TagsWallpapers: data || [] });
                } catch (error) {
                    console.error("Error fetching tags wallpapers:", error);
                }
            },

            getTagWallpaper: async (TagsWallpaperId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tags_wallpaper/${TagsWallpaperId}`);
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error fetching tag wallpaper by ID:", error);
                    return null;
                }
            },

            updateTagWallpaper: async (TagsWallpaperID, TagWallpaperData) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tags_wallpaper/${TagsWallpaperID}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(TagWallpaperData)
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error updating tag wallpaper:", error);
                    return null;
                }
            },

            deleteTagWallpaper: async (id_tag, id_wallpaper) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/tags_wallpaper/tags/${id_tag}/wallpaper/${id_wallpaper}`, {
                        method: "DELETE"
                    });
                    if (!resp.ok) throw new Error("Failed to delete tag wallpaper");
                    const updatedTagsWallpapers = getStore().TagsWallpapers.filter(
                        tw => !(tw.tag.id === id_tag && tw.wallpaper.id === id_wallpaper)
                    );
                    setStore({ TagsWallpapers: updatedTagsWallpapers });
                } catch (error) {
                    console.error("Error deleting tag wallpaper:", error);
                }
            },

            getComentsWallpapers: async () => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/coments`);
                    const data = await resp.json();
                    console.log(data)
                    setStore({ coments: data.coments || [] });
                } catch (error) {
                    console.error("Error loading comments for wallpapers:", error);
                }
            },

            getComentAtWallpaper: async (ComentWallpaperId) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/coments/${ComentWallpaperId}`);
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error loading comments for this wallpaper:", error);
                    return null;
                }
            },

            newComentWallpaper: async (ComentWallpaper) => {
                try {
                    console.log("Enviando comentario:", ComentWallpaper);
                    
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/coment/wallpaper`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            fan_id: ComentWallpaper.fan_id,
                            wallpaper_id: ComentWallpaper.wallpaper_id,
                            content: ComentWallpaper.content 
                        })
                    });
            
                    if (!resp.ok) {
                        const errorMessage = await resp.text();
                        throw new Error(`Error en la petición al backend: ${errorMessage}`);
                    }
            
                    const data = await resp.json();
                    console.log("Comentario agregado exitosamente:", data);
            
                
                    const store = getStore();
                    setStore({ coments: [...store.coments, data.registro] });
            
                    return data;
                } catch (error) {
                    console.error("Error agregando comentario a wallpaper:", error);
                    return null;
                }
            },
            
            updateComentWallpaper: async (ComentWallpaperID, ComentWallpaperData) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/coment/${ComentWallpaperID}`, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(ComentWallpaperData)
                    });
                    const data = await resp.json();
                    return data;
                } catch (error) {
                    console.error("Error updating coment at wallpaper:", error);
                    return null;
                }
            },

            deleteComentWallpaper: async (fan_id, wallpaper_id) => {
                try {
                    const resp = await fetch(`${process.env.BACKEND_URL}/api/coments/fan/${fan_id}/wallpaper/${wallpaper_id}`, {
                        method: "DELETE"
                    });
                    if (!resp.ok) throw new Error("Failed to delete coment wallpaper");
                    const updatedComents = getStore().coments.filter(
                        tw => !(tw.fan.id === fan_id && tw.wallpaper.id === wallpaper_id)
                    );
                    setStore({ coments: updatedComents });
                } catch (error) {
                    console.error("Error deleting coment in wallpaper:", error);
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
		
			getWallpapers: async () => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/wallpapers");
					if (!response.ok) throw new Error("Error fetching wallpapers");
			
					const data = await response.json();
					console.log("Wallpapers recibidos:", data); 
			
					setStore({ wallPapers: data || [] }); 
					}
			
					
				 catch (error) {
					console.error("Error fetching wallpapers:", error);
					return false; 
				}
			},
			
			newWallpaper: async (wallpaperData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/wallpaper/new", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(wallpaperData)
					});
					
					if (!response.ok) {
						throw new Error("Failed to create wallpaper");
					}
					
					const data = await response.json();
					console.log("wallpaper created successfully", data);
					return data;
				} catch (error) {
					console.error("Error creating wallpaper:", error);
					return null;
				}
			},
			updateWallpaper: async (wallpaperId, wallpaperData) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/wallpaper/edit/${wallpaperId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify(wallpaperData)
					});
					
					if (!response.ok) {
						throw new Error("Failed to update wallpaper");
					}
					
					const data = await response.json();
					console.log("Wallpaper updated successfully", data);
					return data;
				} catch (error) {
					console.error("Error updating wallpaper:", error);
					return null;
				}
				
			},
			getWallpaperById: async (paperId) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/wallpaper/${paperId}`)
					
					if (!response.ok) {
						throw new Error("Failed to fetch wallpaper data");
					}
					const data = await response.json();
					return data;
				} catch (error) {
					console.error("Error wallpaper fan data:", error);
					return null;
				}
			},
			deleteWallpaper: async (wallpaperId) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + `/api/wallpaper/${wallpaperId}`, {
						method: "DELETE"
					});
			
					if (!response.ok) throw new Error("Error deleting wallpaper");
			
					
					const updatedWallpapers = getStore().wallPapers.filter(wallpaper => wallpaper.id !== wallpaperId);
			
					
					setStore({ wallPapers: updatedWallpapers });
			
				} catch (error) {
					console.error("Error deleting wallpaper:", error);
				}
			},	
		getFavoritos: async () => {
			try{
				
				const resp = await fetch(process.env.BACKEND_URL + "/api/favoritos")
				const data = await resp.json()
				setStore({ favoritos: data })
				
				return data;
			}catch(error){
				console.log("Error loading favoritos from backend", error)
			}
		},
		getSingleFavorito: async (favoritoId) => { 
			try {
				const response = await fetch(process.env.BACKEND_URL + `/api/favoritos/${favoritoId}`)
				
				if (!response.ok) {
					throw new Error("Failed to fetch favoritos",Error);
				}
				const data = await response.json();
				return data;
			} catch (error) {
				console.error("Error:", error);
				return null;
			}
		},
		deleteFavorito: async (id_fan, id_wallpaper) => {
			try {
				const response = await fetch(process.env.BACKEND_URL + `/api/favoritos/fan/${id_fan}/wallpaper/${id_wallpaper}`, {
					method: "DELETE"
				});
				if (!response.ok) throw new Error("Error deleting TagWallpaper");
				const updatedFavoritos = getStore().favoritos.filter(
					favoritos => favoritos.fan.id !== id_fan || favoritos.wallpaper.id !== id_wallpaper
				);
				setStore({ favoritos: updatedFavoritos });				
			} catch (error) {
				console.error("Error deleting Favorito:", error);
			}
		},
		updateFavoritos: async (favoritosId, favoritosData) => {
			try {
				const response = await fetch(process.env.BACKEND_URL + `/api/favoritos/edit/${favoritosId}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(favoritosData)
				});
				
				if (!response.ok) {
					throw new Error("Failed to update favoritos");
				}
				
				const data = await response.json();
				console.log("TagWallpaper updated successfully", data);
				return data;
			} catch (error) {
				console.error("Error updating favoritos:", error);
				return null;
			}
		},
		newFavorito: async (favorito) => {
			try {
				const response = await fetch(process.env.BACKEND_URL + "/api/favorito/new", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(favorito)
				});
				if (!response.ok) {
					throw new Error("Failed to add favorito");
				}
				const data = await response.json();
				console.log("favorito added successfully", data);
				return data;
			} catch (error) {
				console.error("Error:", error);
				return null;
			}
		},
        // loginFan: async (username, password) => {
		// 	try {
		// 		const response = await fetch(process.env.BACKEND_URL + "/api/fan/login", {
		// 			method: "POST",
		// 			headers: { "Content-Type": "application/json" },
		// 			body: JSON.stringify({ username, password }),
		// 		});

		// 		if (response.status !== 200) throw new Error("Failed to login");

		// 		const data = await response.json();
		// 		console.log("Login exitoso:", data);

		// 		setStore({ authFan: true });
		// 		setStore({ fanDashboardData: data.fan_data }); 
		// 		localStorage.setItem("fanToken", data.access_token);
		// 		localStorage.setItem("fanData", JSON.stringify(data.fan_data))

		// 		return true;
		// 	} catch (error) {
		// 		console.error("Error de conexión:", error);
		// 		setStore({ authFan: false });
		// 		return false;
		// 	}
		// },
		getFanDashboard: async () => {
			try {
				const token = localStorage.getItem("fanToken");
				if (!token) throw new Error("No hay token almacenado");

				const response = await fetch(`${process.env.BACKEND_URL}/api/fan/dashboard`, {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (response.status === 200) {
					const data = await response.json();
					console.log("Datos recibidos del backend:", data); 

					setStore({ authFan: true, fanDashboardData: data.fan_data }); 
					localStorage.setItem("fanData", JSON.stringify(data.fan));

					return true;
				} else {
					console.error("Error al acceder al dashboard");
					setStore({ authFan: false, fanDashboardData: [] });
					return null;
				}
			} catch (error) {
				console.error("Error de conexión:", error);
				setStore({ authFan: false, fanDashboardData: [] });
				return false;
			}
		},


		logoutFan:() => { 
            localStorage.removeItem("fanToken")
			localStorage.removeItem("fanData")
			 setStore({authFan:false});
			console.log("Sesión cerrada con éxito.");
		},
		validateAuthFan: () => {
			const token = localStorage.getItem("fanToken");
			const fanData = localStorage.getItem("fanData");

			if (token) {
				setStore({
					authFan: true,
					fanDashboardData: fanData ? JSON.parse(fanData) : null,
				});
				console.log("Fan logeado.");
			} else {
				setStore({ authFan: false, fanDashboardData: [] });
			}
		},
        loginArtista: async (email, password) => {
			try {
				const response = await fetch(process.env.BACKEND_URL + "/api/login-artista", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				});

				if (response.status !== 200) throw new Error("Failed to login");

				const data = await response.json();
				console.log("Login exitoso:", data);

				setStore({ authArtista: true });
				setStore({ artistaDashboardData: data.artista_data }); 
				localStorage.setItem("artistaToken", data.access_token);
				localStorage.setItem("artistaData", JSON.stringify(data.artista_data))
                // localStorage.setItem("artistaFeedToken", data.access_token);
				// localStorage.setItem("artistaFeedData", JSON.stringify(data.artista_data))

				return true;
			} catch (error) {
				console.error("Error de conexión:", error);
				setStore({ authArtista: false });
				return false;
			}
		},

        loginFan: async (username, password) => {
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/fan/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });
                if (response.status !== 200) throw new Error("Failed to login");
                const data = await response.json();
                console.log("Login exitoso:", data);
                setStore({ authFan: true });
                setStore({ fanFeedData: data.fan_data });
                localStorage.setItem("fanToken", data.access_token);
                localStorage.setItem("fanData", JSON.stringify(data.fan_data))
                return true;
            } catch (error) {
                console.error("Error de conexión:", error);
                setStore({ authFan: false });
                return false;
            }
        },

        getFanFeed: async () => {
            try {
                const token = localStorage.getItem("fanToken");
                if (!token) throw new Error("No hay token almacenado");
                const response = await fetch(`${process.env.BACKEND_URL}/api/fan/feed`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) {
                    const data = await response.json();
                    console.log("Datos recibidos del backend:", data);
                    setStore({ authFan: true, fanFeedData: data.fan_data, wallpapers: data.wallpapers, });
                    localStorage.setItem("fanData", JSON.stringify(data.fan_data));
                    return true;
                } else {
                    console.error("Error al acceder al dashboard");
                    setStore({ authFan: false, wallpapers: [] });
                    return null;
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                setStore({ authFan: false, wallpapers: [] });
                return false;
            }
        },
        
        addFavorite: async (wallpaperId) => {
            try {
                const token = localStorage.getItem("fanToken");
                if (!token) throw new Error("No hay token almacenado");
        
                const response = await fetch(`${process.env.BACKEND_URL}/api/add_favorite_wallpaper`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id_wallpaper: wallpaperId }),
                });
        
                const data = await response.json();
                if (response.status === 200) {
                    console.log("Favorito agregado:", data);
                    return true;
                } else {
                    console.error("Error al agregar a favoritos:", data.message);
                    return false;
                }
            } catch (error) {
                console.error("Error de conexión:", error);
                return false;
            }
        },

        getFanProfile: async () => {
            const token = localStorage.getItem("fanToken");
            if (!token) {
                console.error("No se encontró el token en localStorage");
                return;
            }
        
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/fan/profile`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"  
                    }
                });
                 if (!response.ok) {
                    const errorText = await response.text(); 
                    console.error("Error en la respuesta del servidor:", errorText);
                    return;
                 }
                
                const data = await response.json();
                console.log("api/fan/profile",data)
                setStore({ fanFeedData: data });
                setStore({ loading: false });
                localStorage.setItem("fanData", JSON.stringify(data));  
            } catch (error) {
                console.error("Error al obtener perfil", error);
                setStore({ loading: true });
            }
        },
        
        updateFanProfile: async (fan) => {
            const token = localStorage.getItem("fanToken");
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/modifyMyProfile`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(fan)
                });

                const data = await response.json();
                if (response.ok) {
                    console.log(data)
                    alert("Perfil actualizado con éxito");
                    setStore({ fan: data.fan });
                    return true
                } else {
                    console.error("Error al actualizar perfil", data.message);
                }
            } catch (error) {
                console.error("Error al actualizar perfil", error);
            }
        },

        loginArtistaFeed: async (email, password) => {
			try {
				const response = await fetch(process.env.BACKEND_URL + "/api/login-artista", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password }),
				});

				if (response.status !== 200) throw new Error("Failed to login");

				const data = await response.json();
				console.log("Login exitoso:", data);

				setStore({ authArtistaFeed: true });
				setStore({ artistaFeed: data.artista_data }); 
                localStorage.setItem("artistaFeedToken", data.access_token);
				localStorage.setItem("artistaFeedData", JSON.stringify(data.artista_data))

				return true;
			} catch (error) {
				console.error("Error de conexión:", error);
				setStore({ authArtistaFeed: false });
				return false;
			}
		},

        getArtistaDashboard: async () => {
			try {
				const token = localStorage.getItem("artistaToken");
				if (!token) throw new Error("No hay token almacenado");

				const response = await fetch(`${process.env.BACKEND_URL}/api/artista/dashboard`, {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (response.status === 200) {
					const data = await response.json();
					console.log("Datos recibidos del backend:", data); 

					setStore({ authArtista: true, artistaDashboardData: data.artista_data }); 
					localStorage.setItem("artistaData", JSON.stringify(data.artista));

					return true;
				} else {
					console.error("Error al acceder al dashboard");
					setStore({ authArtista: false, artistaDashboardData: [] });
					return null;
				}
			} catch (error) {
				console.error("Error de conexión:", error);
				setStore({ authArtista: false, artistaDashboardData: [] });
				return false;
			}
		},

        getArtistaFeed: async () => {
			try {
				const token = localStorage.getItem("artistaFeedToken");
				if (!token) throw new Error("No hay token almacenado");

				const response = await fetch(`${process.env.BACKEND_URL}/api/artista/dashboard`, {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				});

				if (response.status === 200) {
					const data = await response.json();
					console.log("Datos recibidos del backend:", data); 

					setStore({ authArtistaFeed: true, artistaFeed: data.artista_data }); 
					localStorage.setItem("artistaFeedData", JSON.stringify(data.artista_data));
                    

					return true;
				} else {
					console.error("Error al acceder al dashboard");
					setStore({ authArtistaFeed: false, artistaFeed: [] });
					return null;
				}
			} catch (error) {
				console.error("Error de conexión:", error);
				setStore({ authArtistaFeed: false, artistaFeed: [] });
				return false;
			}
		},

        logoutArtista: () => { 
            localStorage.removeItem("artistaToken")
			localStorage.removeItem("artistaData")
			 setStore({authArtista:false});
			console.log("Sesión cerrada con éxito.");
		},

        logoutFeedArtista:() => { 
            localStorage.removeItem("artistaFeedToken")
			localStorage.removeItem("artistaFeedData")
			 setStore({authArtistaFeed:false});
			console.log("Sesión cerrada con éxito.");
		},

		validateAuthArtista: () => {
			const token = localStorage.getItem("artistaToken");
			const artistaData = localStorage.getItem("artistaData");

			if (token) {
				setStore({
					authArtista: true,
					artistaDashboardData: artistaData ? JSON.parse(artistaData) : null,
				});
				console.log("Artista logeado.");
			} else {
				setStore({ authArtista: false, ArtistaDashboardData: [] });
			}
		},
        
            
          getWallpapersLocated:  async () => {
            try {
              const response = await fetch(`${process.env.BACKEND_URL}/api/wallpapers/located`);
              const data = await response.json();
              console.log("Respuesta del servidor:", data);
              setStore({wallpapersLocated: data})
              return data;
            } catch (error) {
              console.error("Error en la solicitud de getWallpapersLocated:", error);
              return null;
            }
          },
          
          createLocatedWallpaper: async (newLocatedWallpaper) => {
            try {
              if (!newLocatedWallpaper || typeof newLocatedWallpaper !== "object") {
                console.error("Los datos proporcionados no son válidos.");
                throw new Error("El objeto newLocatedWallpaper es requerido y debe ser válido.");
              }
          
              const response = await fetch(`${process.env.BACKEND_URL}/api/wallpapers/new/located`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newLocatedWallpaper),
              });
          
              if (!response.ok) {
                console.error(`Error del servidor: ${response.status} ${response.statusText}`);
                throw new Error("Error al crear el locatedWallpaper en el backend.");
              }
          
              const createdWallpaper = await response.json();
          
              if (!createdWallpaper || !createdWallpaper.id) {
                console.warn("El locatedWallpaper creado no tiene un ID válido. Respuesta recibida:", createdWallpaper);
                throw new Error("La respuesta del backend no contiene datos válidos.");
              }
          
              const store = getStore();
              setStore({
                ...store,
                wallpapersLocated: [...(store.wallpapersLocated || []), createdWallpaper],
              });
          
              console.log("Nuevo locatedWallpaper creado exitosamente:", createdWallpaper);
              return createdWallpaper;
            } catch (error) {
              console.error("Error al crear un nuevo locatedWallpaper:", error.message || error);
              return null;
            }
          },
          
            
            
            fetchGeocode: async (address) => {
                try {
                    
                    if (!address || address.trim() === "") {
                        console.error("Error: La dirección está vacía o no es válida.");
                        return null;
                    }
            
                    const response = await fetch(`${process.env.BACKEND_URL}/api/google/maps/geocode`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ address }),
                    });
            
                    if (!response.ok) {
                        console.error(`Error del servidor: ${response.status} ${response.statusText}`);
                        throw new Error("Error al conectar con el servidor.");
                    }
            
                    const data = await response.json();
            
                    
                    if (!data.latitude || !data.longitude) {
                        console.warn("No se encontraron coordenadas para la dirección proporcionada.");
                        return null;
                    }
            
                    console.log("Coordenadas obtenidas:", { lat: data.latitude, lng: data.longitude });
                    return { lat: data.latitude, lng: data.longitude };
                } catch (error) {
                    console.error("Error al obtener geocoding:", error.message || error);
                    return null;
                }
            },

            createLocatedArtista: async (newArtista) => {
                try {
                  const resp = await fetch(process.env.BACKEND_URL + "/api/artista/located", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newArtista)
                  });
              
                  if (!resp.ok) {
                    const errorData = await resp.json();
                    console.error("Error al crear artista:", errorData);
                    return null;
                  }
              
                  const data = await resp.json();
                  console.log("Artista creado:", data);
                  return data;
              
                } catch (error) {
                  console.error("Error al conectar con el backend:", error);
                  return null;
                }
              },

              getArtistasLocated: async () => {
                try {
                  const resp = await fetch(process.env.BACKEND_URL + "/api/artistas/located");
              
                  if (!resp.ok) {
                    const errorData = await resp.json();
                    console.error("Error al obtener artistas localizados:", errorData);
                    return;
                  }
              
                  const data = await resp.json();
                  console.log("Artistas localizados cargados:", data);
              
                  
                  setStore({ artistasLocated: data });
              
                } catch (error) {
                  console.error("Error al conectar con el backend para artistas localizados:", error);
                }
              },
              
              
            
        validateAuthArtistaFeed: () => {
			const token = localStorage.getItem("artistaFeedToken");
			const artistaData = localStorage.getItem("artistaFeedData");

			if (token) {
				setStore({
					authArtistaFeed: true,
					artistaFeed: artistaData ? JSON.parse(artistaData) : null,
				});
				console.log("Feed logeado.");
			} else {
				setStore({ authArtistaFeed: false, artistaFeed: [] });
			}
		},

        publicar_wallpaper: async (wallpaperData) => {
            try {
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('artistaFeedToken')}`, 
                    },
                    body: JSON.stringify(wallpaperData), 
                };
        
                const response = await fetch(`${process.env.BACKEND_URL}/api/publicar-wallpaper`, requestOptions);
                
                if (!response.ok) {
                    throw new Error('Error creando el wallpaper');
                }
                
                const data = await response.json();
                setStore({ authArtistaFeed: true });
                return data; 
            } catch (error) {
                console.error("Error en newWallpaper:", error);
                return null;
            }
        },

        getWallpapersByUser: async () => {
            try {
                const artistaFeedToken = localStorage.getItem("artistaFeedToken");
                console.log("Token enviado:", artistaFeedToken); 
                const resp = await fetch(`${process.env.BACKEND_URL}/api/get-wallpapers`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${artistaFeedToken}`, 
                        "Content-Type": "application/json", 
                    },
                });
        
                if (!resp.ok) {
                    throw new Error(`Error: ${resp.status} - ${resp.statusText}`);
                }
        
                const data = await resp.json();
                console.log("Datos recibidos del backend:", data); 
                setStore({ wallpapers: data });
            } catch (error) {
                console.error("Error fetching wallpapers by user:", error.message);
            }
        },
        
createComentForWallpaper: async ({ content, fan_id, wallpaper_id }) => {
    try {
      const resp = await fetch(process.env.BACKEND_URL + "/api/fan/comentarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, fan_id, wallpaper_id }),
      });
  
      if (!resp.ok) {
        const error = await resp.json();
        console.error("Error al crear comentario:", error);
        return false;
      }
  
      const data = await resp.json();
      return data;
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      return false;
    }
  }, 
  getComentsByWallpaperId: async (wallpaperId) => {
    try {
      const resp = await fetch(`${process.env.BACKEND_URL}/api/wallpaper/${wallpaperId}/comentarios`);
      if (!resp.ok) throw new Error("Error al obtener comentarios");
      const data = await resp.json();
      return data; 
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
      return [];
    }
  },
  loginFanFeed: async (username, password) => {
    try {
        const response = await fetch(process.env.BACKEND_URL + "/api/fan/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (response.status !== 200) throw new Error("Failed to login");

        const data = await response.json();
        console.log("Login exitoso:", data);

        setStore({ authFanFeed: true });
        setStore({ feedData: data.fan_data }); 
        localStorage.setItem("fanFeedToken", data.access_token);
        localStorage.setItem("fanFeedData", JSON.stringify(data.fan_data))

        return true;
    } catch (error) {
        console.error("Error de conexión:", error);
        setStore({ authFanFeed: false });
        return false;
    }
},

  getFanFeed: async () => {
    try {
        const token = localStorage.getItem("fanFeedToken");
        if (!token) throw new Error("No hay token almacenado");

        const response = await fetch(`${process.env.BACKEND_URL}/api/fan/feed/comment`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            const data = await response.json();
            console.log("Datos recibidos del backend:", data); 

            setStore({ authFan: true, feedData: data.logged }); 
            localStorage.setItem("fanFeedData", JSON.stringify(data.logged));

            return true;
        } else {
            console.error("Error al acceder al dashboard");
            setStore({ authFanFeed: false, feedData: [] });
            return null;
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        setStore({ authFanFeed: false, feedData: [] });
        return false;
    }
},

validateAuthFanFeed: () => {
    const token = localStorage.getItem("fanFeedToken");
    const fanData = localStorage.getItem("fanFeedData");

    if (token) {
        setStore({
            authFanFeed: true,
            feedData: fanData ? JSON.parse(fanData) : null,
        });
        console.log("Feed logeado.");
    } else {
        setStore({ authFanFeed: false, feedData: [] });
    }
},
logoutFanFeed:
		() => { localStorage.removeItem("fanFeedToken")
			localStorage.removeItem("fanFeedData")
			 setStore({authFanFeed:false});
			console.log("Sesión cerrada con éxito.");
		},
          
          
        
        
        
        
        getMeGusta: async () => {
            try {
                const resp = await fetch(process.env.BACKEND_URL + "/api/me_gusta");
                const data = await resp.json();
                setStore({ me_gusta: data });
                console.log (data)
                return data; // Resuelve la promesa retornando los datos
            } catch (error) {
                console.log("Error cargando Me Gusta desde el backend", error);
            }
        },
        getSingleMeGusta: async (id) => {
            try {
                const response = await fetch(process.env.BACKEND_URL + `/api/me_gusta/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch single Me Gusta");
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching Me Gusta:", error);
                return null;
            }
        },
        newMeGusta: async (meGusta) => {
            try {
                const response = await fetch(process.env.BACKEND_URL + "/api/me_gusta/new", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(meGusta)
                });
                if (!response.ok) {
                    throw new Error("Failed to add Me Gusta");
                }
                const data = await response.json();
                console.log("Me Gusta añadido exitosamente:", data);
                return data;
            } catch (error) {
                console.error("Error:", error);
                return null;
            }
        },
        updateMeGusta: async (meGustaId, meGustaData) => {
            try {
                const response = await fetch(process.env.BACKEND_URL + `/api/me_gusta/edit/${meGustaId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(meGustaData)
                });
                if (!response.ok) {
                    throw new Error("Failed to update Me Gusta");
                }
                const data = await response.json();
                console.log("Me Gusta actualizado exitosamente:", data);
                return data;
            } catch (error) {
                console.error("Error actualizando Me Gusta:", error);
                return null;
            }
        },
        deleteMeGusta: async (id_fan, id_wallpaper) => {
            try {
                const response = await fetch(process.env.BACKEND_URL + `/api/me_gusta/fan/${id_fan}/wallpaper/${id_wallpaper}`, {
                    method: "DELETE"
                });
                if (!response.ok) {
                    throw new Error("Error eliminando Me Gusta");
                }
                const updatedMeGusta = getStore().me_gusta.filter(
                    me_gusta => me_gusta.id_fan !== id_fan || me_gusta.id_wallpaper !== id_wallpaper
                );
                setStore({ me_gusta: updatedMeGusta });
                console.log("Me Gusta eliminado exitosamente");
            } catch (error) {
                console.error("Error eliminando Me Gusta:", error);
            }
        },


        followArtist: async (artistaId) => {
            try {
                const resp = await fetch(`${process.env.BACKEND_URL}/api/follow/${artistaId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("fanToken")
                    }
                });
                if (resp.ok) {
                    return true;
                }
                return false;
            } catch (err) {
                console.error("Error al seguir artista:", err);
                return false;
            }
        },


        checkIfFollowingArtist: async (artistId) => {
            try {
                const resp = await fetch(`${process.env.BACKEND_URL}/api/is_following/${artistId}`, {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("fanToken")
                    }
                });
                const data = await resp.json();
                return data.is_following; // depende cómo lo devuelva tu API
            } catch (err) {
                console.error("Error verificando seguimiento:", err);
                return false;
            }
        },
        createArtistaView: async (artistaData) => {
            try {
                const resp = await fetch(`${process.env.BACKEND_URL}/api/artista/view`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(artistaData)
                });
        
                if (!resp.ok) {
                    const errorData = await resp.json();
                    console.error("Error al crear artista:", errorData);
                    return false;
                }
        
                const data = await resp.json();
                console.log("Artista creado:", data);
                return data;
            } catch (error) {
                console.error("Error de red al crear artista:", error);
                return false;
            }
        },
        
        
		}	
    };
};

export default getState;