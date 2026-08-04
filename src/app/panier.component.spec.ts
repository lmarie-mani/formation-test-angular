import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanierComponent } from './panier.component';

// TP — Tests unitaires Angular
// Consignes détaillées : tp/tp2-unitaires-angular.md
// Remplacez chaque xit par un vrai it(...).

describe('PanierComponent', () => {
  let fixture: ComponentFixture<PanierComponent>;
  let component: PanierComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanierComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;
  });

  it.skip('affiche un message quand le panier est vide', () => {});

  it.skip('recalcule le total quand une ligne est ajoutée', () => {});

  it.skip('additionne plusieurs lignes de produits différents', () => {});
});
