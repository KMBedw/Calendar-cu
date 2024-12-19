import { useNavigate, useLocation } from "react-router-dom";
import immg from '../image/theatre.jpg';

const EventCard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer les informations de l'événement cliqué
  const event = location.state?.event;

  const handleBackClick = () => {
    navigate("/calendar");
  };

  return (
    <div style={styles.cardContainer}>
      {/* Image de l'événement */}
      <div style={styles.imageContainer}>
        <img
          src={immg}
          alt={event?.title || "Événement"}
          style={styles.image}
        />
      </div>

      {/* Informations de l'événement */}
      <div style={styles.eventDetails}>
        <h2 style={styles.title}>{event?.title || "Titre de l'événement"}</h2>
        <hr style={styles.divider} />
        <p>
          <strong>Horaires :</strong>{" "}
          {event
            ? `${new Date(event.date_begin).toLocaleString()} à ${new Date(event.date_end).toLocaleString()}`
            : "Non spécifié"}
        </p>
        <p><strong>Lieu :</strong> {event?.place || "Non spécifié"}</p>
        <p><strong>Type d'évènement :</strong> {event?.event_type || "Non spécifié"}</p>
        <p><strong>Organisateurs :</strong> {event?.organisators || "Non spécifié"}</p>
      </div>

      {/* Description de l'événement */}
      <div style={styles.description}>
        <p>
          {event?.description ||
            "Aucune description disponible pour cet événement."}
        </p>
      </div>

      {/* Bouton "Revenir au Calendrier" */}
      <div style={styles.backButton}>
        <button style={styles.button} onClick={handleBackClick}>
          Revenir au Calendrier
        </button>
      </div>
    </div>
  );
};

// Styles en ligne
const styles = {
  cardContainer: {
    maxWidth: "500px",
    margin: "0 auto",
    backgroundColor: "#F9F9F9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "6px",
    fontFamily: "Arial, sans-serif",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
  },
  eventDetails: {
    marginTop: "16px",
  },
  title: {
    fontSize: "24px",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  divider: {
    width: "50%",
    margin: "0 auto 16px auto",
    border: "0.5px solid #ddd",
  },
  description: {
    marginTop: "16px",
    fontSize: "14px",
    color: "#666",
  },
  backButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "16px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default EventCard;
