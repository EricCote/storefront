export interface Translatable 
	{
			[locale: string]: { [prop: string]: string } | string | undefined;
	  } 


export function displayLang(locale: string, item: Translatable, prop: string): string {
	return (item?.[locale] as Record<string, string>)?.[prop] ?? item?.[prop];
}