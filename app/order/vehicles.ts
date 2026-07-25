export type VehicleVariant = {
  code: string;
  name: string;
  description: string;
  /** Path under /public, e.g. "/images/cars/model3-highland.png". */
  image?: string;
};

export type VehicleModel = {
  code: string;
  name: string;
  variants: VehicleVariant[];
};

export const VEHICLE_MODELS: VehicleModel[] = [
  {
    code: "model_3",
    name: "Model 3",
    variants: [
      {
        code: "no_heat_pump",
        name: "Without Heat-Pump [2018–2020]",
        description:
          "Manufactured from 2018 until late 2020 with a piano-black center console.",
      },
      {
        code: "pre_facelift",
        name: "Pre-Facelift [With Heat-Pump]",
        description:
          "Manufactured from early 2021 until late 2023 before turning into the Highland.",
      },
      {
        code: "highland_premium",
        name: "Facelift / Highland [Premium]",
        description:
          "Manufactured from late 2023 onward, with leather seats and an RGB strip.",
      },
      {
        code: "standard",
        name: "Model 3 Standard [Fabric Seats]",
        description:
          "Manufactured after October 2025 without leather seats and no RGB strip.",
      },
    ],
  },
  {
    code: "model_y",
    name: "Model Y",
    variants: [
      {
        code: "pre_facelift",
        name: "Pre-Facelift [With Heat-Pump]",
        description:
          "Manufactured from early 2021 until early 2025 before turning into the Juniper.",
      },
      {
        code: "juniper_premium",
        name: "Facelift / Juniper [Premium]",
        description:
          "Manufactured since early 2025, featuring leather seats and an RGB strip (NOT the Long Base 6-seater).",
      },
      {
        code: "standard",
        name: "Model Y Standard [Fabric Seats]",
        description:
          "Manufactured after October 2025 without leather seats and no RGB strip.",
      },
      {
        code: "six_seater_yl",
        name: "6-Seater YL [YYY]",
        description:
          "Manufactured from mid 2025 onward, also known as Long Base (NOT the standard Juniper).",
      },
    ],
  },
];

export function findVehicle(modelCode: unknown, variantCode: unknown) {
  const model = VEHICLE_MODELS.find((m) => m.code === modelCode);
  const variant = model?.variants.find((v) => v.code === variantCode);
  return model && variant ? { model, variant } : null;
}
