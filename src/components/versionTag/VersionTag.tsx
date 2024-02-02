import { REPO_URL } from '../../constants/routePaths';
import { styled } from 'styled-components';
import pjson from '../../../package.json';
import { GREY } from '../../constants/colors';

const VersionNumberTag = () => {
  return (
    <TagContainer>
      <VersionTag
        href={REPO_URL}
        target={'_blank'}
        data-cy="Version-Tag"
      >
        V {pjson.version}
      </VersionTag>
    </TagContainer>
  );
};

const TagContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: flex-end;
  align-items: flex-end;
  height: 30px;
`;

const VersionTag = styled.a`
  color: ${GREY};
  font-family: 'InerNormal' !important;
`;

export default VersionNumberTag;
