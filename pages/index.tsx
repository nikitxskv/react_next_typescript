import { NextPage } from 'next';

export const InstancesRoute = '/';

interface InstancesProps {
  lol: Set<string>;
  lil: string[];
}

/**
 * Компонент для отрисовки списка инстансов по урлу /
 */
const InstancesPage: NextPage<InstancesProps> = (props) => {
  console.log(props);
  return (
    <b>
      {`lol size: ${props.lol.size}`}
      <br />
      {`lil size: ${props.lil.length}`}
    </b>
  );
};

/**
 * Получение пропсов при серверном рендеринге.
 * https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
 */
InstancesPage.getInitialProps = async (ctx) => {
  const lol = new Set<string>(['a', 'b', 'c']);
  const lil = ['a', 'b', 'c'];
  const props = { lol, lil };
  console.log(props);
  return props;
};

export default InstancesPage;
