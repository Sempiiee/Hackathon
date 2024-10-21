import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'configurations',
})
export class Configuration extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // User Information
  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 2 })
  middleInitial: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 100 })
  region: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  // Daily Water Consumption Entries
  @Column({ type: 'bigint', nullable: true })
  waterConsumptionEntry1: number;

  @Column({ type: 'bigint', nullable: true })
  waterConsumptionEntry2: number;

  @Column({ type: 'bigint', nullable: true })
  waterConsumptionEntry3: number;

  @Column({ type: 'bigint', nullable: true })
  waterConsumptionEntry4: number;

  @Column({ type: 'bigint', nullable: true })
  waterConsumptionEntry5: number;

  @Column({ type: 'bigint', nullable: true })
  waterConsumptionEntry6: number;

  @Column({ type: 'bigint', nullable: true })
  waterConsumptionEntry7: number;

  @Column({ type: 'bigint', nullable: true })
  waterConsumptionEntry8: number;

  @Column({ type: 'bigint', nullable: true })
  waterConsumptionEntry9: number;

  @Column({ type: 'bigint', nullable: true })
  waterConsumptionEntry10: number;

  // User Goals
  @Column({ type: 'int', nullable: true })
  goal1: number;

  @Column({ type: 'int', nullable: true })
  goal2: number;

  @Column({ type: 'int', nullable: true })
  goal3: number;

  @Column({ type: 'int', nullable: true })
  goal4: number;

  @Column({ type: 'int', nullable: true })
  goal5: number;
}
