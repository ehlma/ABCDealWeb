import { useEffect, useState } from "react";
import api, { API_ENDPOINTS } from "../../../api/api.js";
import { roles } from '../../constants/roles';
import { Eye, EyeOff, ChevronDown } from "lucide-react";

const AdminSettings = () => {
	const [deleteConfirmId, setDeleteConfirmId] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [users, setUsers] = useState([]);
	const [okMessage, setOkMessage] = useState("");
	const [isCreatingUser, setIsCreatingUser] = useState(false);

	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		role: "admin"
	});

	const [editUserId, setEditUserId] = useState(null);
	const [editData, setEditData] = useState({});
	const [error, setError] = useState("");
	const [searchTerm, setSearchTerm] = useState("");

	const fetchUsers = async () => {
		try {
			const res = await api.get(API_ENDPOINTS.users);
			setUsers(res.data);
		} catch (err) {
			setError("Kunne ikke hente brukere");
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setError("");
		setOkMessage("");
		setIsCreatingUser(true);

		try {
			await api.post(API_ENDPOINTS.users, formData);

			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				role: "admin",
			});

			setOkMessage("Ansatt ble opprettet!");
			await fetchUsers();

			setTimeout(() => {
				setOkMessage("");
			}, 3000);
		} catch (err) {
			setError("Feil ved opprettelse av ansatt. Prøv igjen.");

			setTimeout(() => {
				setError("");
			}, 3000);
		} finally {
			setIsCreatingUser(false);
		}
	};


	const handleDelete = async (id) => {
		try {
			await api.delete(`${API_ENDPOINTS.users}/${id}`);
			fetchUsers();
		} catch (err) {
			setError("Kunne ikke slette bruker");
		}
	};

	const handleEdit = async (user) => {
		setEditUserId(user._id);
		setEditData({
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			role: user.role
		});
	};

	const handleEditChange = (e) => {
		setEditData({ ...editData, [e.target.name]: e.target.value });
	};

	const handleUpdate = async (id) => {
		try {
			await api.put(`${API_ENDPOINTS.users}/${id}`, editData);
			await fetchUsers();
			setEditUserId(null);
			setEditData({});
		} catch (e) {
			setError("Kunne ikke oppdatere bruker");
		}
	};

	const filteredUsers = users.filter((user) => {
		const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
		return fullName.includes(searchTerm.toLowerCase());
	});

	const usersToDisplay = searchTerm ? filteredUsers : users;

	return (
		<div className="w-full max-w-6xl mx-auto mt-[32px] px-[16px]">

			{/* Ny ansatt + informasjonstekst */}
			<div className="bg-warm-off-white shadow-md rounded p-6 grid grid-cols-1 md:grid-cols-2 gap-8">

				{/* Skjema */}
				<form onSubmit={handleSubmit} className="space-y-[16px]">
					<h2 className="text-2xl font-bold mb-[24px] text-ui-background">Ny ansatt</h2>

					<input
						type="text"
						placeholder="Fornavn"
						className="border border-gray-300 rounded px-[12px] py-[8px] w-full"
						value={formData.firstName}
						onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
						required
					/>
					<input
						type="text"
						placeholder="Etternavn"
						className="border border-gray-300 rounded px-[12px] py-[8px] w-full"
						value={formData.lastName}
						onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
						required
					/>
					<input
						type="email"
						placeholder="E-post"
						className="border border-gray-300 rounded px-[12px] py-[8px] w-full"
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						required
					/>

					<div className="relative inline-block w-full">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Passord"
							value={formData.password}
							className="w-full border border-gray-300 rounded px-[12px] py-[8px] pr-[40px]"
							onChange={(e) => setFormData({ ...formData, password: e.target.value })}
							required
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute top-1/2 right-[8px] -translate-y-1/2 p-0 bg-transparent border-none cursor-pointer"
							aria-label={showPassword ? "Skjul passord" : "Vis passord"}
						>
							{showPassword ? <EyeOff className="w-[20px] h-[20px] text-gray-500" /> : <Eye className="w-5 h-5 text-gray-500" />}
						</button>
					</div>

					<div className="relative">
						<select
							name="role"
							value={formData.role}
							onChange={(e) => setFormData({ ...formData, role: e.target.value })}
							required
							className="w-full border border-gray-300 rounded px-[12px] py-[8px] appearance-none"
						>
							{roles.map((role) => (
								<option key={role.value} value={role.value}>{role.label}</option>
							))}
						</select>
						<ChevronDown className="absolute right-[8px] top-[45%] -translate-y-1/2 text-gray-500 pointer-events-none h-[20px] w-[20px]" />
					</div>

					<button
						type="submit"
						disabled={isCreatingUser}
						className="mt-[8px] bg-ui-background text-white font-medium py-[8px] px-[16px] rounded hover:bg-blue-400 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
					>
						{isCreatingUser ? "Lagrer..." : "Opprett ansatt"}
					</button>

					{isCreatingUser && (
						<div className="mt-4 rounded px-4 py-3 text-sm font-medium flex items-center gap-3 bg-blue-50 text-blue-800 border border-blue-200">
							<span className="admin-settings__spinner"></span>
							<p>Lagrer ny ansatt. Vennligst vent...</p>
						</div>
					)}

					{okMessage && (
						<div className="mt-4 rounded px-4 py-3 text-sm font-medium bg-green-50 text-green-800 border border-green-200">
							{okMessage}
						</div>
					)}

					{error && (
						<div className="mt-4 rounded px-4 py-3 text-sm font-medium bg-red-50 text-red-800 border border-red-200">
							{error}
						</div>
					)}



				</form>

				{/* Informasjonsboks */}
				<div className="text-gray-700 text-sm leading-relaxed text-left mt-20">
					<h3 className="text-lg font-semibold mb-2 text-ui-background">Administrasjon av ansatte</h3>
					<p className="mb-6">
						Her kan du legge til nye ansatte i systemet. Brukere med rollen
						<span className="font-semibold"> "admin"</span> får full tilgang til alle administrative funksjoner,
						inkludert oppretting og redigering av artikler og ansatte.
					</p>

					<h4 className="text-md font-semibold mb-2 text-ui-background">Tips</h4>
					<ul className="list-disc list-inside space-y-2">
						<li>Sørg for at e-postadressen er riktig – denne brukes til innlogging</li>
						<li>Velg riktig rolle for å gi tilgangsnivå</li>
						<li>Bruk et sterkt passord som du husker: dette kan <span className="font-semibold">ikke</span> endres senere</li>
						<li>Hvis du har glemt passordet må du velge "Glemt passord" på innloggingssiden</li>
						<li>Kun brukere med <span className="font-semibold">admin-rolle</span> kan redigere ansatte</li>
					</ul>
				</div>
			</div>

			{/* Liste over ansatte */}
			<div className="col-span-3 mt-[56px] w-full">
				<div className="w-full shadow-sm px-[24px] py-[24px] mb-[32px] bg-warm-off-white rounded-lg">
					<h2 className="text-xl mb-[32px] pb-[4px] text-left text-ui-background font-bold">
						Ansatte
					</h2>

					{/* Søkefelt */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:gap-[16px] mb-[16px] w-full">
						<label htmlFor="search" className="block text-base font-medium mb-[8px] text-left">
							Søk etter ansatt
						</label>
						<input
							type="text"
							placeholder="Søk etter navn..."
							className="px-[12px] py-[8px] border border-gray-300 rounded w-full max-w-[300px]"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>

					{/* Liste over ansatte */}
					<ul className="grid gap-[16px]">
						{usersToDisplay.map((user) => (
							<li key={user._id} className="bg-white shadow-sm rounded p-[16px]">
								<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
									<div className="space-y-[4px] text-left">
										<p className="flex items-center gap-2">
											👤 <span className="font-semibold">Navn:</span> {user.firstName} {user.lastName}
										</p>
										<p className="flex items-center gap-2">
											✉️ <span className="font-semibold">E-post:</span> {user.email}
										</p>
										<p className="flex items-center gap-2">
											🔑 <span className="font-semibold">Rolle:</span> {user.role}
										</p>
									</div>

									<div className="flex flex-row justify-center">
										{deleteConfirmId === user._id ? (
											<>
												<p className="text-red-500 font-medium self-center">Slette bruker?</p>
												<button onClick={() => handleDelete(user._id)} className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded">Ja</button>
												<button onClick={() => setDeleteConfirmId(null)} className="bg-gray-400 hover:bg-gray-500 text-white text-sm px-3 py-1 rounded">Nei</button>
											</>
										) : (
											<>
												<button
													onClick={() => {
														handleEdit(user);
														setEditUserId(editUserId === user._id ? null : user._id);
													}}
													className="bg-ui-background hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
												>
													{editUserId === user._id ? "Lukk" : "Rediger"}
												</button>
												<button
													onClick={() => setDeleteConfirmId(user._id)}
													className="bg-red-900 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
												>
													Slett
												</button>
											</>
										)}
									</div>
								</div>

								{editUserId === user._id && (
									<div className="mt-4 bg-gray-50 p-4 rounded shadow-inner space-y-2">
										<input name="firstName" value={editData.firstName} onChange={handleEditChange} className="border border-gray-300 rounded px-3 py-2 w-full" placeholder="Fornavn" />
										<input name="lastName" value={editData.lastName} onChange={handleEditChange} className="border border-gray-300 rounded px-3 py-2 w-full" placeholder="Etternavn" />
										<input name="email" value={editData.email} onChange={handleEditChange} className="border border-gray-300 rounded px-3 py-2 w-full" placeholder="E-post" />
										<select name="role" value={editData.role} onChange={handleEditChange} className="border border-gray-300 rounded px-3 py-2 w-full">
											{roles.map((role) => (
												<option key={role.value} value={role.value}>
													{role.label}
												</option>
											))}
										</select>
										<div className="flex flex-row justify-end gap-2">
											<button onClick={() => handleUpdate(user._id)} className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600">Lagre</button>
											<button onClick={() => setEditUserId(null)} className="bg-gray-300 text-gray-800 px-3 py-1 text-sm rounded hover:bg-gray-400">Avbryt</button>
										</div>
									</div>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>

		</div>
	);


};

export default AdminSettings;
