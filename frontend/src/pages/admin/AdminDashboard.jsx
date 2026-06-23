import "./AdminDashboard.css";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import api, {API_ENDPOINTS} from "../../../api/api";

function AdminDashboard() {
    const { user } = useOutletContext();
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await api.get(API_ENDPOINTS.adminActivity);
                setActivities(response.data);
            } catch (error) {
                console.error("Kunne ikke hente aktivitet;", error);
            }
        };

        fetchActivities();
    }, [])

    return (
        <section className="admin-dashboard">
            <section className="admin-dashboard__header">
                <h1>Hei, {user.firstName}</h1>
                <p>Velkommen tilbake til 3S Admin!</p>
            </section>

            <section className="admin-dashboard__content">
                <section className="admin-dashboard__main">
                    <section className="admin-dashboard__cards">
                        <a href="/admin/settings" className="admin-dashboard__card">
                            <span className="admin-dashboard__card-label">Administrasjon</span>

                            <h2>Ansatte</h2>
                            <p>Administrer ansatte og brukere.</p>
                        </a>

                        <a href="/admin/articles" className="admin-dashboard__card">
                            <span className="admin-dashboard__card-label">Innhold</span>

                            <h2>Artikler</h2>
                            <p>Administrer artikler og innhold.</p>
                        </a>
                    </section>
                </section>

                <aside className="admin-dashboard__activity">
                    <h2>Nylig aktivitet</h2>

                    <ul>
                        {activities.map((activity) => (
                            <li key={activity.activityId}>
                                <span>{activity.title}</span>
                                <time>
                                    {new Date(activity.createdAt).toLocaleDateString("nb-NO")}
                                </time>
                            </li>
                        ))}
                    </ul>
                </aside>
            </section>
        </section>
    );
}

export default AdminDashboard;