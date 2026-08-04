import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProduitService } from './produit.service';
import { Produit } from './produit.model';

// TP — Tests d'intégration Angular
// Consignes détaillées : tp/tp4-integration-angular.md
// Remplacez chaque xit par un vrai it(...).

describe('ProduitService', () => {
  let service: ProduitService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProduitService, provideHttpClientTesting()],
    });
    service = TestBed.inject(ProduitService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it.skip('récupère la liste des produits', () => {
    const produitsMock: Produit[] = [
      { id: 1, nom: 'canape', categorie: 'salon', prix: 10, stock: 5 },
      { id: 2, nom: 'chaise', categorie: 'salon', prix: 20, stock: 1 },
    ];

    service.getProduits().subscribe((produits) => {
      expect(produits).toEqual(produitsMock);
    });

    const req = httpMock.expectOne('/api/produits');
    expect(req.request.method).toBe('GET');
    req.flush(produitsMock);
  });
});
