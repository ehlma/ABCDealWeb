import ContactForm from "../models/ContactForm.js";
import nodemailer from "nodemailer";

/*
 * Hindrer at HTML som brukeren skriver inn
 * blir tolket som ekte HTML i e-posten.
 */
const escapeHtml = (value = "") => {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
};


// POST /api/contact
export const submitContact = async (req, res) => {
  try {
    const {
      contactType,
      name,
      email,
      phoneNum,
      text,

      vehicleModel,
      yearModel,
      mileage,
      registrationNumber,
      extraEquipment,
      knownIssues,
      serviceHistory,
    } = req.body;


    /*
     * SIKKERHET / VALIDERING
     */

    if (!name || !email || !phoneNum) {
      return res.status(400).json({
        message:
          "Navn, e-post og telefonnummer må fylles ut.",
      });
    }

    if (
      contactType !== "purchase" &&
      contactType !== "sale"
    ) {
      return res.status(400).json({
        message: "Ugyldig type kontaktskjema.",
      });
    }


    /*
     * VALIDERING FOR KJØP
     */

    if (contactType === "purchase" && !text) {
      return res.status(400).json({
        message: "Melding må fylles ut.",
      });
    }


    /*
     * VALIDERING FOR SALG
     */

    if (contactType === "sale") {
      if (
        !vehicleModel ||
        !yearModel ||
        !mileage ||
        !registrationNumber ||
        !extraEquipment ||
        !knownIssues ||
        !serviceHistory
      ) {
        return res.status(400).json({
          message:
            "Alle feltene om bobilen må fylles ut.",
        });
      }
    }


    /*
     * HENT FILER SOM MULTER HAR LASTET OPP
     */

    const densityFile =
      req.files?.densityControlFile?.[0];

    const uploadedImages =
      req.files?.vehicleImages || [];


    /*
     * Gjør tetthetskontroll-filen klar
     * for lagring i MongoDB
     */

    const densityControlFile = densityFile
      ? {
        url: densityFile.path,
        publicId: densityFile.filename,
        originalName:
          densityFile.originalname,
      }
      : {
        url: "",
        publicId: "",
        originalName: "",
      };


    /*
     * Gjør bildene klare for MongoDB
     */

    const vehicleImages = uploadedImages.map(
      (file) => ({
        url: file.path,
        publicId: file.filename,
        originalName: file.originalname,
      })
    );


    /*
     * OPPRETT HENVENDELSE
     */

    const contact = new ContactForm({
      contactType,

      name: name.trim(),
      email: email.trim().toLowerCase(),
      phoneNum: phoneNum.trim(),

      text:
        contactType === "purchase"
          ? text?.trim()
          : "",

      vehicleModel:
        contactType === "sale"
          ? vehicleModel?.trim()
          : "",

      yearModel:
        contactType === "sale"
          ? yearModel?.trim()
          : "",

      mileage:
        contactType === "sale"
          ? mileage?.trim()
          : "",

      registrationNumber:
        contactType === "sale"
          ? registrationNumber
            ?.trim()
            .toUpperCase()
          : "",

      extraEquipment:
        contactType === "sale"
          ? extraEquipment?.trim()
          : "",

      knownIssues:
        contactType === "sale"
          ? knownIssues?.trim()
          : "",

      serviceHistory:
        contactType === "sale"
          ? serviceHistory?.trim()
          : "",

      densityControlFile:
        contactType === "sale"
          ? densityControlFile
          : undefined,

      vehicleImages:
        contactType === "sale"
          ? vehicleImages
          : [],
    });


    /*
     * LAGRE I DATABASE
     */

    const saved = await contact.save();


    /*
     * E-POST
     */

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });


    /*
     * E-POST FOR KJØP
     */

    let subject = "";
    let emailHtml = "";


    if (contactType === "purchase") {
      subject = `Ny henvendelse om kjøp fra ${name}`;

      emailHtml = `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 650px;
                    margin: 0 auto;
                    color: #222222;
                ">

                    <h1 style="
                        font-size: 24px;
                        margin-bottom: 24px;
                    ">
                        Ny henvendelse – kjøp
                    </h1>


                    <h2 style="
                        font-size: 18px;
                        margin-top: 24px;
                        margin-bottom: 12px;
                    ">
                        Kontaktinformasjon
                    </h2>


                    <p>
                        <strong>Navn:</strong><br>
                        ${escapeHtml(name)}
                    </p>

                    <p>
                        <strong>E-post:</strong><br>
                        ${escapeHtml(email)}
                    </p>

                    <p>
                        <strong>Telefon:</strong><br>
                        ${escapeHtml(phoneNum)}
                    </p>


                    <h2 style="
                        font-size: 18px;
                        margin-top: 32px;
                        margin-bottom: 12px;
                    ">
                        Melding
                    </h2>

                    <p style="
                        white-space: pre-line;
                        line-height: 1.6;
                    ">
                        ${escapeHtml(text)}
                    </p>

                </div>
            `;
    }


    /*
     * E-POST FOR SALG
     */

    if (contactType === "sale") {
      subject =
        `Ny bobil til salgs – ${registrationNumber}`;


      /*
       * Lager liste med bilder
       */

      const imagesHtml =
        vehicleImages.length > 0
          ? vehicleImages
            .map(
              (image, index) => `
                                <li style="margin-bottom: 8px;">
                                    <a
                                        href="${image.url}"
                                        target="_blank"
                                    >
                                        Åpne bilde ${index + 1}
                                    </a>
                                </li>
                            `
            )
            .join("")
          : `
                        <li>
                            Ingen bilder lastet opp
                        </li>
                    `;


      /*
       * Tetthetskontroll
       */

      const densityHtml =
        densityControlFile.url
          ? `
                        <a
                            href="${densityControlFile.url}"
                            target="_blank"
                        >
                            Åpne dokumentasjon
                        </a>
                    `
          : "Ingen dokumentasjon lastet opp";


      emailHtml = `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 650px;
                    margin: 0 auto;
                    color: #222222;
                ">

                    <h1 style="
                        font-size: 24px;
                        margin-bottom: 24px;
                    ">
                        Ny henvendelse – salg av bobil
                    </h1>


                    <!-- KONTAKTINFORMASJON -->

                    <h2 style="
                        font-size: 18px;
                        margin-top: 24px;
                        margin-bottom: 12px;
                    ">
                        Kontaktinformasjon
                    </h2>


                    <p>
                        <strong>Navn:</strong><br>
                        ${escapeHtml(name)}
                    </p>

                    <p>
                        <strong>E-post:</strong><br>
                        ${escapeHtml(email)}
                    </p>

                    <p>
                        <strong>Telefon:</strong><br>
                        ${escapeHtml(phoneNum)}
                    </p>


                    <!-- BOBIL -->

                    <h2 style="
                        font-size: 18px;
                        margin-top: 32px;
                        margin-bottom: 12px;
                    ">
                        Informasjon om bobilen
                    </h2>


                    <p>
                        <strong>Biltype og modell:</strong><br>
                        ${escapeHtml(vehicleModel)}
                    </p>


                    <p>
                        <strong>Årsmodell:</strong><br>
                        ${escapeHtml(yearModel)}
                    </p>


                    <p>
                        <strong>Kilometerstand:</strong><br>
                        ${escapeHtml(mileage)} km
                    </p>


                    <p>
                        <strong>Registreringsnummer:</strong><br>
                        ${escapeHtml(
        registrationNumber
      )}
                    </p>


                    <!-- EKSTRAUTSTYR -->

                    <h2 style="
                        font-size: 18px;
                        margin-top: 32px;
                        margin-bottom: 12px;
                    ">
                        Ekstrautstyr
                    </h2>

                    <p style="
                        white-space: pre-line;
                        line-height: 1.6;
                    ">
                        ${escapeHtml(extraEquipment)}
                    </p>


                    <!-- FEIL OG MANGLER -->

                    <h2 style="
                        font-size: 18px;
                        margin-top: 32px;
                        margin-bottom: 12px;
                    ">
                        Kjente feil og mangler
                    </h2>

                    <p style="
                        white-space: pre-line;
                        line-height: 1.6;
                    ">
                        ${escapeHtml(knownIssues)}
                    </p>


                    <!-- SERVICE -->

                    <h2 style="
                        font-size: 18px;
                        margin-top: 32px;
                        margin-bottom: 12px;
                    ">
                        Servicehistorikk
                    </h2>

                    <p style="
                        white-space: pre-line;
                        line-height: 1.6;
                    ">
                        ${escapeHtml(serviceHistory)}
                    </p>


                    <!-- TETTHETSKONTROLL -->

                    <h2 style="
                        font-size: 18px;
                        margin-top: 32px;
                        margin-bottom: 12px;
                    ">
                        Tetthetskontroll
                    </h2>

                    <p>
                        ${densityHtml}
                    </p>


                    <!-- BILDER -->

                    <h2 style="
                        font-size: 18px;
                        margin-top: 32px;
                        margin-bottom: 12px;
                    ">
                        Bilder av bobilen
                    </h2>

                    <p>
                        ${vehicleImages.length}
                        ${vehicleImages.length === 1
          ? " bilde"
          : " bilder"
        }
                        lastet opp.
                    </p>

                    <ul>
                        ${imagesHtml}
                    </ul>

                </div>
            `;
    }


    /*
     * SEND E-POST
     */

    try {
      await transporter.sendMail({
        from: `"3S Bobil & Caravan" <${process.env.MAIL_USER}>`,

        // Adressen som skal motta skjemaene
        to:
          process.env.MAIL_RECEIVER ||
          process.env.MAIL_USER,

        // Gjør at "Svar" i e-postprogrammet
        // svarer direkte til kunden
        replyTo: email,

        subject,

        html: emailHtml,
      });
    } catch (emailError) {
      /*
       * Henvendelsen ligger allerede trygt i
       * MongoDB, selv om e-posten skulle feile.
       */

      console.error(
        "Kontaktskjema lagret, men e-post kunne ikke sendes:",
        emailError
      );
    }


    /*
     * SVAR TIL FRONTEND
     */

    res.status(201).json({
      message: "Kontaktskjema sendt.",
      contact: saved,
    });

  } catch (error) {
    console.error(
      "Error submitting contact form:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET /api/contact
// Admin only
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactForm.find({
      $or: [
        { isArchived: false },
        {
          isArchived: {
            $exists: false,
          },
        },
      ],
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(contacts);

  } catch (error) {
    console.error(
      "Error fetching contact forms:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};


// GET /api/contact/archived
// Admin only
export const getAllArchivedContacts = async (
  req,
  res
) => {
  try {
    const contacts =
      await ContactForm.find({
        isArchived: true,
      }).sort({
        createdAt: -1,
      });

    res.status(200).json(contacts);

  } catch (error) {
    console.error(
      "Error fetching archived contact forms:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};