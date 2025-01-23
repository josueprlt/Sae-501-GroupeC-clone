export async function fetchSearchEvents(query: string | null, location: string | null, startDate: string | null, endDate: string | null, creatorFirstname: string | null, limit: number, offset: number) {
  try {
    const url = new URL(`https://localhost/api/search-events`);
    if (query) url.searchParams.append('q', query);
    if (location) url.searchParams.append('location', location);
    if (startDate) url.searchParams.append('startDate', startDate);
    if (endDate) url.searchParams.append('endDate', endDate);
    if (creatorFirstname) url.searchParams.append('creatorFirstname', creatorFirstname);
    url.searchParams.append('limit', limit.toString());
    url.searchParams.append('offset', offset.toString());

    const res = await fetch(url.toString());
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

export async function fetchHighlightedEvents() {
  try {
    const res = await fetch("https://localhost/api/highlighted-events");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching highlighted events:", error);
    return null;
  }
}

export async function fetchUniqueLocations(searchTerm: string) {
  try {
    const url = searchTerm
      ? `https://localhost/api/unique-locations?q=${encodeURIComponent(searchTerm)}`
      : `https://localhost/api/unique-locations`;
    const res = await fetch(url);
    const data = await res.json();
    return data.map((location: { location: string }) => location.location);
  } catch (error) {
    console.error("Error fetching unique locations:", error);
    return [];
  }
}

export async function fetchUniqueUserNames(searchTerm: string) {
  try {
    const url = searchTerm
      ? `https://localhost/api/unique-user-names?q=${encodeURIComponent(searchTerm)}`
      : `https://localhost/api/unique-user-names`;
    const res = await fetch(url);
    const data = await res.json();
    return data.map((user: { firstname: string }) => String(user.firstname));
  } catch (error) {
    console.error("Error fetching unique user names:", error);
    return [];
  }
}

export async function fetchEvent(id : number) {
  try {
    const res = await fetch("https://localhost/api/event/" + id);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching highlighted events:", error);
    return null;
  }
}

export async function createEvent(
    title: string,
    description: string,
    privacy: boolean,
    location: string,
    start_date: string,
    end_date: string,
    imageUrl: string,
    creator: string
) {
    const formData = {
        title,
        description,
        privacy,
        location,
        start_date,
        end_date,
        image: imageUrl,
        creator
    };

    try {
        const response = await fetch('https://localhost:443/api/create-event', {
            method: 'POST',
            headers: {
                'accept': 'application/ld+json',
                'Content-Type': 'application/ld+json'
            },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.errors || 'Erreur lors de la création de l\'événement');
        }
    } catch (error) {
        console.error('Error creating event:', error);
        throw new Error('Erreur lors de la création de l\'événement');
    }
}

export async function joinEvent(eventId: string) {
try {
  const response = await fetch(`https://localhost:443/api/events/join/${eventId}`, {
    method: 'POST',
    headers: {
      'accept': 'application/ld+json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.errors || 'Erreur lors de l\'inscription à l\'événement');
  }
} catch (error) {
  console.error('Error joining event:', error);
  throw new Error('Erreur lors de l\'inscription à l\'événement');
}
}

export async function leaveEvent(eventId: string) {
try {
  const response = await fetch(`https://localhost:443/api/events/leave/${eventId}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/ld+json',
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  });

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.errors || 'Erreur lors de la désinscription de l\'événement');
  }
} catch (error) {
  console.error('Error leaving event:', error);
  throw new Error('Erreur lors de la désinscription de l\'événement');
}
}

export async function isUserRegistered(eventId: number) {
  try {
    const response = await fetch(`https://localhost/api/users/is-registered/${eventId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/ld+json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors || 'Erreur lors de la vérification de l\'inscription');
    }
  } catch (error) {
    console.error('Error checking registration:', error);
    throw new Error('Erreur lors de la vérification de l\'inscription');
  }
}

export async function updateEvent(
  id: string,
  title: string,
  description: string,
  location: string,
  privacy: boolean,
  start_date: string,
  end_date: string,
  image: string
) {
  try {
    const response = await fetch("https://localhost:443/api/update-event/" + id, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/merge-patch+json",
      },
      body: JSON.stringify({
        title,
        description,
        location,
        privacy,
        start_date,
        end_date,
        image
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

export async function deleteEvent(eventId: string) {
  try {
    const response = await fetch(`https://localhost:443/api/delete-event/${eventId}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/ld+json',
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.errors || 'Erreur lors de la suppression de l\'événement');
    }
  } catch (error) {
    console.error('Error deleting event:', error);
    throw new Error('Erreur lors de la suppression de l\'événement');
  }
}
export async function createEventRegistration(email: string, event: string) {
  const formData = {
      event,
      email,
  };

  try {
      const response = await fetch('https://localhost:443/api/register-event', {
          method: 'POST',
          headers: {
              'accept': 'application/ld+json',
              'Content-Type': 'application/ld+json'
          },
          body: JSON.stringify(formData),
          credentials: 'include'
      });

      if (response.ok) {
          const data = await response.json();
          return data;
      } else {
          const errorData = await response.json();
          if (response.status === 409) {
              throw new Error('Erreur: Données dupliquées');
          }
          throw new Error(`Erreur lors de l'inscription à l'événement: ${response.status} ${response.statusText} - ${errorData.errors || 'Données incorrectes'}`);
      }
  } catch (error) {
      console.error('Error creating event registration:', error);
      throw new Error(`Erreur lors de l'inscription à l'événement: ${error.message}`);
  }
}

export async function confirmRegistration(token: string) {
  try {
      const response = await fetch('https://localhost:443/api/confirm-registration', {
          method: 'POST',
          headers: {
              'accept': 'application/ld+json',
              'Content-Type': 'application/ld+json'
          },
          body: JSON.stringify({ token }),
          credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
          return data;
      } else {
          throw { status: response.status, message: data.error || 'Données incorrectes' };
      }
  } catch (error) {
      console.error('Error confirming registration:', error);
      throw error;
  }
}

export async function removeRegistration(token: string) {
  try {
      const response = await fetch('https://localhost:443/api/remove-registration', {
          method: 'POST',
          headers: {
              'accept': 'application/ld+json',
              'Content-Type': 'application/ld+json'
          },
          body: JSON.stringify({ token }),
          credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
          return data;
      } else {
          throw { status: response.status, message: data.error || 'Données incorrectes' };
      }
  } catch (error) {
      console.error('Error removing registration:', error);
      throw error;
  }
}

export async function verifyToken(eventId: string, token: string) {
  try {
    const response = await fetch(`https://localhost:443/api/verifyToken?eventId=${eventId}&token=${token}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Invalid token');
    }
    const data = await response.json();
    console.log("Token verification response data:", data);
    return data;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
}