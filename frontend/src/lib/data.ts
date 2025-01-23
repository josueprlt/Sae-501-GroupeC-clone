export async function fetchUser() {
    try {
        const response = await fetch("https://localhost:443/api/logged", {
        method : "GET",
        credentials: "include",
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        return null;
    }
}


export async function updateUserProfile(firstname: string, lastname: string, age: number, bio: string) {

    try {
        const response = await fetch("https://localhost:443/api/user/update/profile", {
            method : "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname,
                lastname,
                age,
                bio,
            }),
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        return null;
    }
  
}


export async function updateUserSettings(email: string, password: string, newPassword: string) {
    try {
        const response = await fetch("https://localhost:443/api/user/update/settings", {
            method : "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                newPassword,
            }),
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        return null;
    }
  
}


export async function updateUserProfilePicture(imageUrl: string) {
    try {
        const response = await fetch('https://localhost:443/api/user/update/image', {
            method: 'POST',
            body: JSON.stringify({ imageUrl }),
            credentials: 'include',
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export async function isAdmin() {
    try {
        const response = await fetch("https://localhost:443/api/isadmin", {
        method : "GET",
        credentials: "include",
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        return null;
    }
}

export async function fetchUserEvents() {
    try {
      const res = await fetch("https://localhost/api/user-events", {
        credentials: 'include'
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching user events:", error);
      return null;
    }
}

export async function fetchUserCreatedEvents() {
    try {
      const res = await fetch("https://localhost/api/user-created-events", {
        credentials: 'include'
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error fetching user events:", error);
      return null;
    }
}


export async function deleteUserAccount(password: string) {
    try {
        const response = await fetch("https://localhost:443/api/user/delete", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'An error occurred');
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("Error deleting user account:", error);
        return { error: error.message };
    }
}

export async function fetchUserUniqueLocations(searchTerm: string) {
    try {
      const url = searchTerm
        ? `https://localhost/api/user-unique-locations?q=${encodeURIComponent(searchTerm)}`
        : `https://localhost/api/user-unique-locations`;
      const res = await fetch(url, {
        credentials: 'include'
      });
      const data = await res.json();
      return data.map((location: { location: string }) => location.location);
    } catch (error) {
      console.error("Error fetching unique locations:", error);
      return [];
    }
}

export async function fetchUserSearchEvents(query: string | null, location: string | null, startDate: string | null, endDate: string | null, limit: number, offset: number) {
    try {
        const url = new URL(`https://localhost/api/user-created-events`);
        if (query) url.searchParams.append('q', query);
        if (location) url.searchParams.append('location', location);
        if (startDate) url.searchParams.append('startDate', startDate);
        if (endDate) url.searchParams.append('endDate', endDate);
        url.searchParams.append('limit', limit.toString());
        url.searchParams.append('offset', offset.toString());

        const res = await fetch(url.toString(), {
            credentials: 'include'
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        return {
            total: data.total,
            events: data.events
        };
    } catch (error) {
        console.error("Error fetching events:", error);
        return null;
    }
}