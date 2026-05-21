import { useState } from "react";
import { useNavigate } from "react-router";
import { addRecipe } from "../services/recipeService";

function AddNewRecipe() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		title: "",
		durationValue: "",
		durationUnits: "minutes",
		ingredients: "",
		image: null,
	});
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const onChange = (e) => {
		const { name, value, files } = e.target;
		if (name === "image") {
			setForm((prev) => ({ ...prev, image: files?.[0] || null }));
			return;
		}
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!form.title.trim()) {
			setError("title is required");
			return;
		}
		if (form.title.trim().length < 2) {
			setError("title must be at least 2 characters");
			return;
		}
		if (form.durationValue !== "" && Number(form.durationValue) < 0) {
			setError("duration value must be at least 0");
			return;
		}

		try {
			setIsSubmitting(true);
			const payload = new FormData();
			payload.append("title", form.title.trim());

			const duration = {
				value: form.durationValue === "" ? 0 : Number(form.durationValue),
				units: form.durationUnits,
			};
			payload.append("duration", JSON.stringify(duration));

			if (form.ingredients.trim()) {
				payload.append("ingredients", form.ingredients);
			}
			if (form.image) {
				payload.append("image", form.image);
			}

			await addRecipe(payload);
			navigate("/dashboard");
		} catch (err) {
			setError(err.message || "Failed to create recipe");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm">
			<h1 className="text-2xl font-bold text-gray-800 mb-5">Add New Recipe</h1>

			{error ? (
				<div className="mb-4 rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</div>
			) : null}

			<form onSubmit={onSubmit} className="space-y-4" encType="multipart/form-data">
				<div>
					<label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
						Title
					</label>
					<input
						id="title"
						name="title"
						type="text"
						value={form.title}
						onChange={onChange}
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="Recipe title"
					/>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					<div className="sm:col-span-2">
						<label htmlFor="durationValue" className="block text-sm font-medium text-gray-700 mb-1">
							Duration
						</label>
						<input
							id="durationValue"
							name="durationValue"
							type="number"
							min="0"
							value={form.durationValue}
							onChange={onChange}
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="0"
						/>
					</div>
					<div>
						<label htmlFor="durationUnits" className="block text-sm font-medium text-gray-700 mb-1">
							Unit
						</label>
						<select
							id="durationUnits"
							name="durationUnits"
							value={form.durationUnits}
							onChange={onChange}
							className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="minutes">minutes</option>
							<option value="hour">hour</option>
						</select>
					</div>
				</div>

				<div>
					<label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
						Ingredients
					</label>
					<input
						id="ingredients"
						name="ingredients"
						type="text"
						value={form.ingredients}
						onChange={onChange}
						className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						placeholder="onion, tomato, salt"
					/>
					<p className="text-xs text-gray-500 mt-1">Enter ingredients separated by commas.</p>
				</div>

				<div>
					<label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
						Recipe Image
					</label>
					<input
						id="image"
						name="image"
						type="file"
						accept="image/png,image/jpeg,image/jpg"
						onChange={onChange}
						className="w-full text-sm"
					/>
				</div>

				<div className="flex justify-end gap-3 pt-2">
					<button
						type="button"
						className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
						onClick={() => navigate(-1)}
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isSubmitting}
						className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
					>
						{isSubmitting ? "Saving..." : "Save Recipe"}
					</button>
				</div>
			</form>
		</div>
	);
}

export default AddNewRecipe;
