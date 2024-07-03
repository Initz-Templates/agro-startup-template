
import { Chrono } from 'react-chrono';

const Farming = () => {
    // Define the items for the timeline
    const items = [
        { title: "1866", cardTitle: "Beginning", cardSubtitle: "The start of farming.", cardDetailedText: "Lorem, ipsum dolor sit amet consectetur adipisicing elit." },
        { title: "1900", cardTitle: "1900", cardSubtitle: "Early 20th Century", cardDetailedText: "Lorem, ipsum dolor sit amet consectetur adipisicing elit." },
        { title: "1950", cardTitle: "1950", cardSubtitle: "Mid 20th Century", cardDetailedText: "Lorem, ipsum dolor sit amet consectetur adipisicing elit." },
        { title: "2000", cardTitle: "2000", cardSubtitle: "Turn of the Millennium", cardDetailedText: "Lorem, ipsum dolor sit amet consectetur adipisicing elit." },
        { title: "2023", cardTitle: "2023", cardSubtitle: "Present Day", cardDetailedText: "Lorem, ipsum dolor sit amet consectetur adipisicing elit." }
    ];

    return (
        <div className="max-w-screen-xl mx-auto my-10">
            <div className="max-w-screen-lg mx-auto my-10">
                <Chrono 
                    items={items} 
                    mode="HORIZONTAL"
                    theme={{
                        primary: "#0b3d91", // Tailwind color: `text-blue-800`
                        secondary: "#f5f5f5", // Tailwind color: `bg-gray-100`
                        cardBgColor: "#ffffff", // Tailwind color: `bg-white`
                        cardForeColor: "#000000" // Tailwind color: `text-black`
                    }}
                    allowDynamicUpdate = {false}
                />
            </div>
        </div>
    );
};

export default Farming;
