import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// Importation des données JSON
import eventsData from "../Data/data.json";

const Events = ({ showBackButton = true }) => {
  const navigate = useNavigate();
  const [showAllEvents, setShowAllEvents] = useState(false);

  const handleBackClick = () => {
    navigate("/calendar");
  };

  const handleShowMore = () => {
    setShowAllEvents(!showAllEvents);
  };

  // Extraire les événements du fichier JSON
  const today = new Date();
  const upcomingEvents = eventsData.events.filter((event) => {
    const eventStartDate = new Date(event.date_begin);
    return eventStartDate >= today; // Garde uniquement les événements à venir
  });

  // Afficher tous les événements ou seulement les 5 premiers
  const eventsToDisplay = showAllEvents ? upcomingEvents : upcomingEvents.slice(0, 5);

  return (
    <div style={styles.container}>
      {showBackButton && (
        <div style={styles.header}>
          <button style={styles.backButton} onClick={handleBackClick}>
            ← Revenir au Calendrier
          </button>
        </div>
      )}

      <h1 style={styles.pageTitle}>ÉVÉNEMENTS À VENIR</h1>

      {upcomingEvents.length > 0 ? (
        <div style={styles.eventsList}>
          {eventsToDisplay.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      ) : (
        <p style={styles.noEventsMessage}>Aucun événement à venir pour le moment.</p>
      )}

      {upcomingEvents.length > 5 && (
        <div style={styles.showMoreButtonContainer}>
          <button style={styles.showMoreButton} onClick={handleShowMore}>
            {showAllEvents ? "Voir moins d'événements" : "Voir plus d'événements"}
          </button>
        </div>
      )}
    </div>
  );
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/EventCard`, { state: { event } });
  };

  return (
    <div style={styles.eventCard} onClick={handleCardClick}>
      <img
        src="https://www.lehavre-etretat-tourisme.com/uploads/2020/04/le-havre_0000-00_week-end-de-la-glisse_erik-levilly-ville-du-havre.jpg"
        alt={event.title}
        style={styles.eventImage}
      />
      <div style={styles.eventInfo}>
        <h3 style={styles.eventTitle}>{event.title}</h3>
        <p style={styles.eventDetails}>Lieu : {event.place}</p>
        <p style={styles.eventDetails}>
          {`Du ${new Date(event.date_begin).toLocaleDateString()} à ${new Date(
            event.date_end
          ).toLocaleDateString()}`}
        </p>
        <p style={styles.eventDetails}>Organisé par : {event.organisators}</p>
        <p style={styles.eventDetails}>
          <em>{event.event_type}</em>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Arial', sans-serif",
    color: "#333",
    backgroundColor: "#F8F8F8",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
  },
  backButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  pageTitle: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "0",
    padding: "10px 0",
    backgroundColor: "#1A1A4E",
    color: "#fff",
  },
  eventsList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  noEventsMessage: {
    textAlign: "center",
    color: "#666",
    fontSize: "18px",
    marginTop: "20px",
  },
  eventCard: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: "4px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    width: "300px",
    margin: "10px",
    cursor: "pointer",
  },
  eventImage: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  },
  eventInfo: {
    padding: "10px",
    textAlign: "left",
  },
  eventTitle: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0 0 5px 0",
  },
  eventDetails: {
    fontSize: "12px",
    color: "#666",
    margin: "2px 0",
  },
  showMoreButtonContainer: {
    textAlign: "center",
    marginTop: "20px",
  },
  showMoreButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Events;
