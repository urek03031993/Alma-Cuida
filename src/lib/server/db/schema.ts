import { relations } from 'drizzle-orm';
import { pgTable, serial, integer, text, varchar, boolean, timestamp, pgEnum } from 'drizzle-orm/pg-core';
export * from './auth.schema';


// Estados de la solicitud
export const serviceOrderStatusEnum = pgEnum("service_order_status", [
	"pending",
	"confirmed",
	"in_progress",
	"completed",
	"cancelled"
]);


// ============================================
// SERVICIOS
// ============================================
export const service = pgTable("services", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description"),
	main: boolean("main").default(false).notNull(),
	active: boolean("active").default(true).notNull(),
	imageUuid: integer("image_uuid").references(() => image.id),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


// ============================================
// MODALIDADES
// ============================================
export const modalitie = pgTable("modalities", {
	id: serial("id").primaryKey(),
	serviceId: integer("service_id").notNull().references(() => service.id),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description"),
	basePrice: integer("base_price").default(0),
	active: boolean("active").default(true).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


// ============================================
// IMÁGENES
// ============================================
export const image = pgTable("images", {
	id: serial("id").primaryKey(),
	uuid: varchar("uuid", { length: 250 }).notNull().unique(),
	name: varchar("name", { length: 250 }).notNull(),
	url: varchar("url", { length: 500 }).notNull(),
	alt: varchar("alt", { length: 500 }).notNull(),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


// ============================================
// TABLA: CLIENTES
// ============================================
export const client = pgTable("clients", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	phone: varchar("phone", { length: 20 }).notNull(),
	address: text("address"),
	IdDocument: varchar("id_document", { length: 20 }).unique(),
	birthDate: timestamp("birth_date", { mode: "date" }),
	description: text("description"),
	active: boolean("active").default(true),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


// ============================================
// TABLA: PROFESIONALES
// ============================================
export const workStatus = pgTable("work_status", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	description: text("description"),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


// ============================================
// TABLA: PROFESIONALES
// ============================================
export const professionals = pgTable("professionals", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 100 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	phone: varchar("phone", { length: 20 }).notNull(),
	address: text("address"),
	IdDocument: varchar("id_document", { length: 20 }).unique(),	
	driverLicense: varchar("driver_license", { length: 50 }),
	experience: integer("experience"),
	certifications: text("certifications"),
	workStatus: boolean("work_status").default(true),
	status: integer("work_status").references(() => workStatus.id),
	description: text("description"),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


// ============================================
// TABLA: SOLICITUDES
// ============================================
export const serviceOrder = pgTable("service_orders", {
	id: serial("id").primaryKey(),
	clientId: integer("client_id").notNull().references(() => client.id, { onDelete: "restrict" }),
	serviceId: integer("service_id").notNull().references(() => service.id, { onDelete: "restrict" }),
	profesionalId: integer("profesional_id").references(() => professionals.id, { onDelete: "set null" }),
	startDate: timestamp("start_date", { withTimezone: true, mode: "date" }).notNull(),
	endDate: timestamp("end_date", { withTimezone: true, mode: "date" }),
	initAddress: text("init_address"),
	endAddress: text("end_address"),
	status: serviceOrderStatusEnum("status").default("pending"),
	priceTotal: integer("price_total").notNull().default(0),
	observations: text("observations"),
	createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
	updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});


// ============================================
// RELACIONES
// ============================================
export const serviceRelations = relations(service, ({ one, many }) => ({
  	modalities: many(modalitie),
	image: one(image, {
		fields: [service.imageUuid],
		references: [image.id],
	})
}));


export const modalitieRelations = relations(modalitie, ({ one }) => ({
	servicio: one(service, {
		fields: [modalitie.serviceId],
		references: [service.id],
	}),
}));
