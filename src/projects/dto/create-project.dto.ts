import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProjectDto {


@IsNotEmpty()
@IsString()
title?: string;

@IsNotEmpty()
@IsString()
description?: string;

@IsNotEmpty()
@IsNumber()
goal?: number;

@IsOptional()
@IsNumber()
raised?: number = 0;

}
