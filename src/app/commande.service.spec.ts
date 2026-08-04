import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Commande, CommandeService } from './commande.service';

// TP — Tests d'intégration Angular
// Consignes détaillées : tp/tp4-integration-angular.md
// Remplacez chaque xit par un vrai it(...).

describe('CommandeService', () => {
  let service: CommandeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandeService, provideHttpClientTesting()],
    });
    service = TestBed.inject(CommandeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Vérifie qu'aucune requête inattendue n'a été déclenchée pendant le test
    httpMock.verify();
  });

  it('envoie une requête POST pour créer une commande', () => {
    const mockCommande: Commande = {
      id: 1,
      clientId: 1,
      lignes: [
        { produitId: 1, quantite: 2 },
        { produitId: 2, quantite: 1 },
      ],
      statut: 'validee',
      total: 100,
    };

    service.creerCommande(mockCommande.clientId, mockCommande.lignes).subscribe((commande) => {
      expect(commande).toEqual(mockCommande);
    });

    const req = httpMock.expectOne('/api/commandes');
    expect(req.request.method).toBe('POST');
    req.flush(mockCommande);
  });

  it("propage une erreur serveur 500 lors de la création d'une commande", () => {
    const succes = vi.fn();
    const echec = vi.fn();

    service.creerCommande(1, []).subscribe({ next: succes, error: echec });

    const req = httpMock.expectOne('/api/commandes');
    req.flush('erreur serveur', { status: 500, statusText: 'internal server error' });

    expect(succes).not.toHaveBeenCalled();
    expect(echec).toHaveBeenCalledOnce();
    expect(echec.mock.calls[0][0].status).toBe(500);
  });
});
