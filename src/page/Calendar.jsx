import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import dayjs from "dayjs";
import FilterPanel from "../composant/filtrePanel";
import Events from "./Events";
import eventData from "../Data/data.json";

const Calendar = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [currentViewDate, setCurrentViewDate] = useState(dayjs()); 

  const calendarRef = useRef(null);

  // Gestion des filtres
  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((category) => category !== value));
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleMonthChange = (e) => {
    const newDate = dayjs(e.target.value);
    setCurrentViewDate(newDate);

    const calendarApi = calendarRef.current.getApi();
    calendarApi.gotoDate(newDate.toDate());
  };
  const handleDatesSet = (dateInfo) => {
    const newDate = dayjs(dateInfo.start);
    setCurrentViewDate(newDate); 
  };

  const filteredEvents = eventData.events
    .filter((event) => {
      const isCategoryMatch =
        selectedCategories.length === 0 || selectedCategories.includes(event.event_type);
      const isLocationMatch = selectedLocation === "All" || event.place === selectedLocation;
      return isCategoryMatch && isLocationMatch;
    })
    .map((event) => ({
      title: event.title,
      start: event.date_begin,
      end: event.date_end,
      color: dayjs(event.date_begin).diff(dayjs(), "day") <= 7 ? "#FFD700" : "#4CAF50",
    }));

  const renderEventContent = (eventInfo) => (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <span role="img" aria-label="work-icon">
        📃📚
      </span>
      <span>{eventInfo.event.title}</span>
    </div>
  );

  return (
    <div style={{ padding: "20px" }}>
      <FilterPanel
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        selectedLocation={selectedLocation}
        onLocationChange={handleLocationChange}
        selectedMonth={currentViewDate.format("YYYY-MM")}
        onMonthChange={handleMonthChange}
      />

<h2 style={styles.currentMonth}>
  {currentViewDate.add(1, "month").format("MMMM YYYY")}
</h2>
      <div style={styles.container}>
        <div style={styles.calendarContainer}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locale={frLocale}
            events={filteredEvents}
            headerToolbar={{
              left: "prev,next today",
              center: "",
              right: "",
            }}
            selectable={true}
            editable={true}
            datesSet={handleDatesSet} // Mettre à jour la date de la vue actuelle
            eventContent={renderEventContent}
          />
        </div>

        <div style={styles.eventsContainer}>
          <Events showBackButton={false} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    padding: "20px",
    gap: "20px",
  },
  calendarContainer: {
    flex: 3,
    minWidth: "600px",
  },
  eventsContainer: {
    flex: 1,
    minWidth: "300px",
  },
  currentMonth: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    padding: "20px 20px 0px 20px",
    color: "#333",
  },
};

export default Calendar;
