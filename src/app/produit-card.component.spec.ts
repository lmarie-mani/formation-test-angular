import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProduitCardComponent } from './produit-card.component';
import { Produit } from './produit.model';

// TP — Tests unitaires Angular
// Consignes détaillées : tp/tp2-unitaires-angular.md
// Remplacez chaque xit par un vrai it(...).

describe('ProduitCardComponent', () => {
  let fixture: ComponentFixture<ProduitCardComponent>;
  let component: ProduitCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProduitCardComponent);
    component = fixture.componentInstance;
  });

  function afficherProduit(produit: Produit): void {
    component.produit = produit;
    fixture.detectChanges();
  }

  it('affiche le badge "stock faible" quand le stock est bas', () => {
    component.produit = {
      id: 1,
      nom: 'nom test',
      categorie: 'test',
      prix: 20,
      stock: 2,
    };

    fixture.detectChanges();

    const badge: HTMLElement = fixture.nativeElement.querySelector('.badge-stock-faible');
    expect(badge).toBeTruthy();
  });

  it.skip('ne montre pas le badge stock faible si le stock est confortable', () => {});

  it('désactive le bouton "Ajouter au panier" si le produit est en rupture', () => {
    component.produit = {
      id: 1,
      nom: 'plus de produit',
      categorie: 'test',
      prix: 15,
      stock: 0,
    };

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('émet ajouterAuPanier au clic quand le produit est disponible', () => {
    let produitTest = {
      id: 1,
      nom: 'produit de test',
      categorie: 'test',
      prix: 20,
      stock: 5,
    };

    component.produit = produitTest;
    fixture.detectChanges();

    //const spy = vi.spyOn(component.ajouterAuPanier, 'emit');

    const spy = vi.fn();
    component.ajouterAuPanier.subscribe(spy);

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(produitTest);
  });

  it.skip('ne déclenche rien au clic si le produit est en rupture', () => {});
});
