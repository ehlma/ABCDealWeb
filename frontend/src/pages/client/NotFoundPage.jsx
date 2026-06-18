import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    // SEO
    useEffect(() => {
        document.title = "Side ikke funnet | 3S Bobil & Caravan";

        let metaDescription = document.querySelector('meta[name="description"]');

        if (!metaDescription) {
            metaDescription = document.createElement("meta");
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }

        metaDescription.content =
            "Siden du leter etter finnes ikke. Gå tilbake til forsiden til 3S Bobil & Caravan.";

        let robotsMeta = document.querySelector('meta[name="robots"]');

        if (!robotsMeta) {
            robotsMeta = document.createElement("meta");
            robotsMeta.name = "robots";
            document.head.appendChild(robotsMeta);
        }

        robotsMeta.content = "noindex, follow";
        return () => {
            robotsMeta.content = "index, follow";
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
            <img
                src="/404.svg"
                alt="404 - side ikke funnet"
                className="max-w-md mb-8"
            />
            <h1 className="text-4xl font-bold mb-4 text-primary">404 - Har du gått deg bort?</h1>
            <p className="mb-6 text-gray-600 text-md">
                Siden du prøvde å gå til finnes ikke, eller er flyttet.
            </p>
            <Link
                to="/"
                className="px-4 py-2 bg-primary text-warm-off-white rounded hover:bg-primary-dark hover:text-warm-off-white transition"
            >
                Gå til forsiden
            </Link>
        </div>
    )
}

export default NotFoundPage;