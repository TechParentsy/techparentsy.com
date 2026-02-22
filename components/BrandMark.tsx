import Image from 'next/image';

type BrandMarkProps = {
  className?: string;
  src?: string;
  darkSrc?: string;
};

export function BrandMark({ className = '', src = '/brand/mark.png', darkSrc }: BrandMarkProps) {
  if (!darkSrc) {
    return <Image src={src} alt="TechParentsy mark" width={128} height={128} className={className} priority />;
  }

  return (
    <>
      <Image src={src} alt="TechParentsy mark" width={128} height={128} className={`${className} dark:hidden`} priority />
      <Image
        src={darkSrc}
        alt="TechParentsy mark"
        width={128}
        height={128}
        className={`hidden ${className} dark:block`}
        priority
      />
    </>
  );
}
