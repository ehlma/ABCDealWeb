import { Mail, Phone, MailIcon } from "lucide-react";
import { useState } from "react";

const TeamMemberCard = ({ name, title, phoneNum, email, image, objectPosition, description }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white/60 backdrop-blur-sm shadow-sm rounded-lg overflow-hidden text-center transition-all duration-300 max-w-[20em] sm:max-w-none">
            <img
                src={image}
                alt={`Bilde av ${name}`}
                className="w-full object-top rounded-t-lg"
                style={{objectPosition}}
            />

            <div className="p-8">
                <h3 className="text-xl font-semibold text-primary">{name}</h3>
                <p className="text-sm text-gray-600 mb-2">{title}</p>
                <p className="text-sm text-gray-500 ">{phoneNum}</p>
                <p className="text-sm text-gray-500 ">{email}</p>


                {expanded ? (
                    <p className="text-gray-700 text-sm">{description}</p>
                ) : null}

                <button 
                    className="text-primary font-medium text-sm mt-2 hover:underline"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "Vis mindre" : "Les mer"}
                </button>
            </div>
        </div>
    )
}

export default TeamMemberCard