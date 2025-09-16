/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export class EntityMapperHelper {
  public mapEntityToDto<T extends object, V extends object>(
    entity: T | null,
    dtoClass: new () => V,
    options?: { excludeKeys?: (keyof V)[] },
  ): V | null {
    if (!entity) return null;

    const dto = new dtoClass();

    // Copia apenas propriedades que existem no DTO
    Object.keys(dto).forEach((key) => {
      if (options?.excludeKeys?.includes(key as keyof V)) return;
      if (key in entity) {
        (dto as any)[key] = (entity as any)[key];
      }
    });

    return dto;
  }
}
