import { useState, VoidFunctionComponent } from 'react';
import { useRouter } from 'next/router';
import styles from './styles.module.css';

const Footer: VoidFunctionComponent = () => {
  const router = useRouter();
  const { locales, locale } = useRouter();
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const onChangeLocale = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLocale(event.target.value);
    router.push('', '', { locale: event.target.value });
  };
  return (
    <>
      <footer>
        <hr />
        <div className={styles.container}>
          <p>Footer</p>
          Change locale:
          <select value={selectedLocale} onChange={onChangeLocale}>
            {locales?.map((currLocale) => {
              return (
                <option key={currLocale} value={currLocale}>
                  {currLocale}
                </option>
              );
            })}
          </select>
        </div>
      </footer>
    </>
  );
};

export default Footer;
