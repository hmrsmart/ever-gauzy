import { IEmployee, IOrganizationContact, ITag, ProposalStatusEnum } from "@gauzy/contracts";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export abstract class ProposalDTO {

    @ApiProperty({ type: () => String })
    @IsOptional()
    @IsString()
    readonly jobPostUrl: string;

    @ApiProperty({ type: () => Date })
    @IsNotEmpty()
    readonly valueDate: Date;

    @ApiProperty({ type: () => String })
    @IsNotEmpty()
    @IsString()
    readonly jobPostContent: string;

    @ApiProperty({ type: () => String })
    @IsNotEmpty()
    @IsString()
    readonly proposalContent: string;

    @ApiProperty({ type: () => String, enum: ProposalStatusEnum })
    @IsNotEmpty()
    @IsEnum(ProposalStatusEnum)
    readonly status: ProposalStatusEnum;

    @ApiProperty({ type: () => Object })
    @IsOptional()
    @IsObject()
    readonly employee: IEmployee;

    @ApiProperty({ type: () => String })
    @IsOptional()
    @IsString()
    readonly employeeId: string;

    @ApiProperty({ type: () => Object })
    @IsOptional()
    @IsObject()
    readonly organizationContact: IOrganizationContact;

    @ApiProperty({ type: () => String })
    @IsOptional()
    @IsString()
    readonly organizationContactId: string;

    @ApiProperty({ type: () => Object, isArray: true })
    @IsOptional()
    readonly tags: ITag[];

}