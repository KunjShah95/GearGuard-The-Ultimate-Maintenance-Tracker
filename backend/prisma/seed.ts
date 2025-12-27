import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@gearguard.com' },
        update: {},
        create: {
            email: 'admin@gearguard.com',
            password: adminPassword,
            name: 'Admin User',
            role: 'ADMIN',
            department: 'Management',
        },
    });
    console.log('✅ Created admin user:', admin.email);

    // Create manager user
    const managerPassword = await bcrypt.hash('manager123', 10);
    const manager = await prisma.user.upsert({
        where: { email: 'manager@gearguard.com' },
        update: {},
        create: {
            email: 'manager@gearguard.com',
            password: managerPassword,
            name: 'Manager User',
            role: 'MANAGER',
            department: 'Operations',
        },
    });
    console.log('✅ Created manager user:', manager.email);

    // Create standard user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'user@gearguard.com' },
        update: {},
        create: {
            email: 'user@gearguard.com',
            password: userPassword,
            name: 'Standard User',
            role: 'USER',
            department: 'General',
        },
    });
    console.log('✅ Created standard user:', user.email);

    // Create technician users
    const techPassword = await bcrypt.hash('tech123', 10);
    const tech1 = await prisma.user.upsert({
        where: { email: 'john@gearguard.com' },
        update: {},
        create: {
            email: 'john@gearguard.com',
            password: techPassword,
            name: 'John Smith',
            role: 'TECHNICIAN',
            department: 'Electrical',
        },
    });

    const tech2 = await prisma.user.upsert({
        where: { email: 'jane@gearguard.com' },
        update: {},
        create: {
            email: 'jane@gearguard.com',
            password: techPassword,
            name: 'Jane Doe',
            role: 'TECHNICIAN',
            department: 'Mechanical',
        },
    });
    console.log('✅ Created technician users');

    // Create maintenance teams
    const electricalTeam = await prisma.maintenanceTeam.upsert({
        where: { id: 'electrical-team' },
        update: {},
        create: {
            id: 'electrical-team',
            name: 'Electrical Team',
            specialization: 'Electrical Systems',
            description: 'Handles all electrical equipment maintenance',
        },
    });

    const mechanicalTeam = await prisma.maintenanceTeam.upsert({
        where: { id: 'mechanical-team' },
        update: {},
        create: {
            id: 'mechanical-team',
            name: 'Mechanical Team',
            specialization: 'Mechanical Systems',
            description: 'Handles all mechanical equipment maintenance',
        },
    });
    console.log('✅ Created maintenance teams');

    // Add team members
    await prisma.teamMember.upsert({
        where: { userId_teamId: { userId: tech1.id, teamId: electricalTeam.id } },
        update: {},
        create: {
            userId: tech1.id,
            teamId: electricalTeam.id,
            role: 'LEAD',
        },
    });

    await prisma.teamMember.upsert({
        where: { userId_teamId: { userId: tech2.id, teamId: mechanicalTeam.id } },
        update: {},
        create: {
            userId: tech2.id,
            teamId: mechanicalTeam.id,
            role: 'LEAD',
        },
    });
    console.log('✅ Added team members');

    // Create equipment
    const equipment1 = await prisma.equipment.upsert({
        where: { serialNumber: 'CNC-001' },
        update: {},
        create: {
            name: 'CNC Milling Machine',
            serialNumber: 'CNC-001',
            category: 'MACHINERY',
            department: 'Production',
            location: 'Building A, Floor 1',
            purchaseDate: new Date('2022-01-15'),
            warrantyExpiry: new Date('2025-01-15'),
            status: 'OPERATIONAL',
            maintenanceTeamId: mechanicalTeam.id,
        },
    });

    const equipment2 = await prisma.equipment.upsert({
        where: { serialNumber: 'HVAC-001' },
        update: {},
        create: {
            name: 'Central Air Conditioning Unit',
            serialNumber: 'HVAC-001',
            category: 'HVAC',
            department: 'Facilities',
            location: 'Rooftop',
            purchaseDate: new Date('2021-06-20'),
            warrantyExpiry: new Date('2024-06-20'),
            status: 'OPERATIONAL',
            maintenanceTeamId: electricalTeam.id,
        },
    });

    const equipment3 = await prisma.equipment.upsert({
        where: { serialNumber: 'FRK-001' },
        update: {},
        create: {
            name: 'Electric Forklift',
            serialNumber: 'FRK-001',
            category: 'VEHICLE',
            department: 'Warehouse',
            location: 'Warehouse B',
            purchaseDate: new Date('2023-03-10'),
            warrantyExpiry: new Date('2026-03-10'),
            status: 'OPERATIONAL',
        },
    });

    const equipment4 = await prisma.equipment.upsert({
        where: { serialNumber: 'GEN-001' },
        update: {},
        create: {
            name: 'Backup Generator',
            serialNumber: 'GEN-001',
            category: 'ELECTRICAL',
            department: 'Facilities',
            location: 'Building A, Basement',
            purchaseDate: new Date('2020-11-05'),
            warrantyExpiry: new Date('2023-11-05'),
            status: 'UNDER_MAINTENANCE',
            maintenanceTeamId: electricalTeam.id,
        },
    });
    console.log('✅ Created equipment');

    // Create maintenance requests
    await prisma.maintenanceRequest.upsert({
        where: { id: 'req-001' },
        update: {},
        create: {
            id: 'req-001',
            subject: 'Generator not starting',
            description: 'The backup generator fails to start during power outage tests.',
            type: 'CORRECTIVE',
            priority: 'HIGH',
            status: 'IN_PROGRESS',
            equipmentId: equipment4.id,
            teamId: electricalTeam.id,
            createdById: admin.id,
            assignedToId: tech1.id,
        },
    });

    await prisma.maintenanceRequest.upsert({
        where: { id: 'req-002' },
        update: {},
        create: {
            id: 'req-002',
            subject: 'Quarterly HVAC maintenance',
            description: 'Scheduled preventive maintenance for the central AC unit.',
            type: 'PREVENTIVE',
            priority: 'MEDIUM',
            status: 'NEW',
            scheduledDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            equipmentId: equipment2.id,
            teamId: electricalTeam.id,
            createdById: admin.id,
        },
    });

    await prisma.maintenanceRequest.upsert({
        where: { id: 'req-003' },
        update: {},
        create: {
            id: 'req-003',
            subject: 'CNC calibration required',
            description: 'Machine is producing parts slightly off-spec. Needs recalibration.',
            type: 'CORRECTIVE',
            priority: 'CRITICAL',
            status: 'NEW',
            equipmentId: equipment1.id,
            teamId: mechanicalTeam.id,
            createdById: admin.id,
        },
    });

    await prisma.maintenanceRequest.upsert({
        where: { id: 'req-004' },
        update: {},
        create: {
            id: 'req-004',
            subject: 'Forklift battery replacement',
            description: 'Battery no longer holds charge for a full shift.',
            type: 'CORRECTIVE',
            priority: 'MEDIUM',
            status: 'REPAIRED',
            completedDate: new Date(),
            duration: 2.5,
            equipmentId: equipment3.id,
            createdById: admin.id,
            assignedToId: tech2.id,
        },
    });
    console.log('✅ Created maintenance requests');

    console.log('🎉 Database seeding completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seed error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
