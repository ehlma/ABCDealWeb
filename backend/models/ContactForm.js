import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema({
    contactType: {
        type: String,
        enum: ["purchase", "sale"],
        default: "purchase",
        required: true,
    },

    // Kontaktinformasjon
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phoneNum: {
        type: String,
        required: true,
    },

    // Brukes når kunden velger "Jeg vil kjøpe"
    text: {
        type: String,
        default: "",
    },

    // Informasjon om bobil ved salg
    vehicleModel: {
        type: String,
        default: "",
    },

    yearModel: {
        type: String,
        default: "",
    },

    mileage: {
        type: String,
        default: "",
    },

    registrationNumber: {
        type: String,
        default: "",
    },

    extraEquipment: {
        type: String,
        default: "",
    },

    knownIssues: {
        type: String,
        default: "",
    },

    serviceHistory: {
        type: String,
        default: "",
    },

    // Dokumentasjon på siste tetthetskontroll
    densityControlFile: {
        url: {
            type: String,
            default: "",
        },
        publicId: {
            type: String,
            default: "",
        },
        originalName: {
            type: String,
            default: "",
        },
    },

    // Bilder av bobilen
    vehicleImages: [
        {
            url: {
                type: String,
                required: true,
            },
            publicId: {
                type: String,
                default: "",
            },
            originalName: {
                type: String,
                default: "",
            },
        },
    ],

    // Beholder gammelt image-felt foreløpig
    image: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    status: {
        type: String,
        enum: ["new", "pending", "resolved"],
        default: "new",
    },

    isArchived: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("ContactForm", contactFormSchema);