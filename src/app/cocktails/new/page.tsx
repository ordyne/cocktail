"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const cocktailSchema = z.object({
	name: z.string().min(1, { message: "Name is required." }),
	ingredients: z.string().min(1, { message: "Ingredients are required." }),
	description: z.string().optional(),
	image: z
		.instanceof(File, { message: "Image is required." })
		.refine((file) => file.size <= MAX_FILE_SIZE, {
			message: "이미지는 5MB 이하로 업로드해야 합니다.",
		})
		.refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
			message:
				"지원하지 않는 이미지 형식입니다. JPEG, JPG, PNG, WEBP 형식만 지원합니다.",
		}),
});

type CocktailFormData = z.infer<typeof cocktailSchema>;

export default function CocktailForm() {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<CocktailFormData>({
		resolver: zodResolver(cocktailSchema),
	});

	const onSubmit = (data: CocktailFormData) => {
		console.log(data);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 bg-white min-h-screen p-4 gap-4">
					<div>
						<p>칵테일 이름</p>
						<input
							{...register("name")}
							placeholder="칵테일 이름"
							className="border-amber-200"
						/>
						{errors.name && <p>{errors.name.message}</p>}
					</div>
					<div>
						<input
							{...register("ingredients")}
							placeholder="재료"
						/>
						{errors.ingredients && (
							<span>{errors.ingredients.message}</span>
						)}
					</div>
					<div>
					<input
						type="file"
						accept="image/jpeg,image/jpg,image/png,image/webp"
						onChange={(e) => {
							const file = e.target.files?.[0];
							setValue("image", file as File, {
								shouldValidate: true,
							});
						}}
					/>
						{errors.image && <span>{errors.image.message}</span>}
						</div>
					<button>등록</button>
				</div>
			</form>
		</>
	);
}
