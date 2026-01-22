// Local enum definitions matching Prisma schema
// These are used for mock data generation

export enum ClubStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}

export enum OfferingType {
  TRAINING = 'TRAINING',
  MATCH = 'MATCH',
  SOCIAL = 'SOCIAL',
  CAMP = 'CAMP',
  COURSE = 'COURSE',
}

export enum SkillLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  ALL = 'ALL',
}

export enum OfferingStatus {
  ACTIVE = 'ACTIVE',
  FULL = 'FULL',
  CANCELLED = 'CANCELLED',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  MIXED = 'MIXED',
}

export enum EventType {
  MATCH = 'MATCH',
  TRAINING = 'TRAINING',
  SOCIAL = 'SOCIAL',
  MEETING = 'MEETING',
  TOURNAMENT = 'TOURNAMENT',
}

export enum EventStatus {
  SCHEDULED = 'SCHEDULED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum ReviewStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
