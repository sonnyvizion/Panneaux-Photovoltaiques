import { beforeEach, describe, expect, it } from 'vitest';
import { lock, lockHolders, resetScrollLock, unlock } from './scrollLock';

/* Pas de jsdom dans ce projet : un objet qui a un `style.overflow` suffit, et
   c'est tout ce que le module touche. */
const fakeBody = () => ({ style: { overflow: '' } }) as unknown as HTMLElement;

describe('scrollLock', () => {
  beforeEach(() => resetScrollLock());

  it('bloque le défilement au premier verrou', () => {
    const body = fakeBody();
    lock('recherche', body);
    expect(body.style.overflow).toBe('hidden');
  });

  /* Le cas qui justifie le module : la recherche s'ouvre DEPUIS le panneau
     mobile, donc les deux verrous sont posés. Refermer la recherche ne doit pas
     rendre le défilement au panneau resté ouvert. */
  it('ne rend pas la page tant qu’une autre surface la tient', () => {
    const body = fakeBody();
    lock('panneau', body);
    lock('recherche', body);
    unlock('recherche', body);
    expect(body.style.overflow).toBe('hidden');
    expect(lockHolders()).toEqual(['panneau']);
  });

  it('rend la page au dernier qui referme', () => {
    const body = fakeBody();
    lock('panneau', body);
    lock('recherche', body);
    unlock('recherche', body);
    unlock('panneau', body);
    expect(body.style.overflow).toBe('');
    expect(lockHolders()).toEqual([]);
  });

  /* ⚠️ LA PROPRIÉTÉ QUI A MOTIVÉ LE PASSAGE DU COMPTEUR AUX NOMS.
     L'événement `close` d'un `<dialog>` peut tirer plus d'une fois. Avec un
     compteur, le second `unlock` aurait décrémenté le verrou du PANNEAU et rendu
     le défilement sous un menu encore ouvert. */
  it('un déverrouillage répété ne vole pas le verrou d’une autre surface', () => {
    const body = fakeBody();
    lock('panneau', body);
    lock('recherche', body);
    unlock('recherche', body);
    unlock('recherche', body);
    unlock('recherche', body);
    expect(body.style.overflow).toBe('hidden');
    expect(lockHolders()).toEqual(['panneau']);
  });

  it('verrouiller deux fois sous le même nom ne pose qu’un verrou', () => {
    const body = fakeBody();
    lock('recherche', body);
    lock('recherche', body);
    unlock('recherche', body);
    expect(body.style.overflow).toBe('');
  });

  it('ignore un déverrouillage orphelin', () => {
    const body = fakeBody();
    unlock('personne', body);
    expect(lockHolders()).toEqual([]);
    lock('recherche', body);
    expect(body.style.overflow).toBe('hidden');
  });
});
